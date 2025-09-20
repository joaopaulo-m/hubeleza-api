import { OperatorTransaction } from "../../../domain/entities/operator-transaction"
import { TransactionStatus } from "../../../domain/enums/transaction-status"
import { TransactionType } from "../../../domain/enums/transaction-type"
import { ComissionType } from "../../../shared/enums/comission-type"
import type { IOperatorRepository } from "../../contracts/repos/operator"
import type { IOperatorTransactionRepository } from "../../contracts/repos/operator-transaction"
import type { IOperatorWalletRepository } from "../../contracts/repos/operator-wallet"
import type { ITransactionRepository } from "../../contracts/repos/transaction"

export interface AddOperatorComissionDto {
  operator_id: string
  transaction_id: string
  partner_id: string
  comission_type: ComissionType
}

interface GetComissionAmountProps {
  comission_type: ComissionType
  amount: number
  sign_up_percentage?: number
  topup_percentage?: number
}

export class AddOperatorComissionUseCase {
  constructor(
    private readonly operatorRepo: IOperatorRepository,
    private readonly transactionRepo: ITransactionRepository,
    private readonly operatorWalletRepo: IOperatorWalletRepository,
    private readonly operatorTransactionRepo: IOperatorTransactionRepository
  ){}

  async execute(props: AddOperatorComissionDto): Promise<Error | void> {
    const operator = await this.operatorRepo.findById(props.operator_id)

    if (!operator) {
      return new Error("Operator not found")
    }

    if (props.comission_type === ComissionType.SIGN_UP && !operator.sign_up_comission_percentage) {
      return new Error("Operator does not have a sign up comission percentage")
    }

    if (props.comission_type === ComissionType.TOPUP && !operator.topup_comission_percentage) {
      return new Error("Operator does not have a topup comission percentage")
    }

    const transaction = await this.transactionRepo.findById(props.transaction_id)

    if (!transaction) {
      return new Error("Transaction not found")
    }

    if (transaction.status !== TransactionStatus.PAID) {
      return new Error("Invalid transaction status")
    }

    const operatorWallet = await this.operatorWalletRepo.findByOperatorId(operator.id)

    if (!operatorWallet) {
      return new Error("Operator wallet not found")
    }

    const comissionAmount = this.getComissionAmount({
      amount: transaction.amount,
      comission_type: props.comission_type,
      sign_up_percentage: operator.sign_up_comission_percentage,
      topup_percentage: operator.topup_comission_percentage
    })
    const creditResult = operatorWallet.credit(comissionAmount)

    if (creditResult instanceof Error) {
      return creditResult
    }

    const comissionTransaction = new OperatorTransaction({
      operator_wallet_id: operatorWallet.id,
      type: TransactionType.INCOME,
      amount: comissionAmount,
      comission_percentage: operator.sign_up_comission_percentage,
      comission_type: props.comission_type,
      partner_id: props.partner_id
    })

    await this.operatorWalletRepo.update(operatorWallet)
    await this.operatorTransactionRepo.create(comissionTransaction)

    return void 0;
  }

  private getComissionAmount(props: GetComissionAmountProps) {
    let comissionAmount = 0

    if (props.comission_type === ComissionType.SIGN_UP && props.sign_up_percentage) {
      comissionAmount = props.amount * (props.sign_up_percentage / 100)
    }

    if (props.comission_type === ComissionType.TOPUP && props.topup_percentage) {
      comissionAmount = props.amount * (props.topup_percentage / 100)
    }

    return comissionAmount
  }
}