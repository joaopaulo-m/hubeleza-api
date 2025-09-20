import { Transaction } from "../../../domain/entities/transaction"
import { TransactionStatus } from "../../../domain/enums/transaction-status"
import { TransactionType } from "../../../domain/enums/transaction-type"
import { FIRST_TRANSACTION_BONUS } from "../../../shared/constants/first-transaction-bonus"
import type { ITransactionRepository } from "../../contracts/repos/transaction"
import type { IWalletRepository } from "../../contracts/repos/wallet"
import type { IPaymentService } from "../../contracts/services/payment"
import type { IQueueService } from "../../contracts/services/queue"

export interface CreateWalletPaymentDto {
  wallet_id: string
  amount: number
  operator_id?: string
}

export interface CreateWalletPaymentReturn {
  transaction_id: string
  qr_code: string
  pix_copy_paste_code: string
}

export class CreateWalletPaymentUseCase {
  constructor(
    private readonly walletRepo: IWalletRepository,
    private readonly transactionRepo: ITransactionRepository,
    private readonly paymentService: IPaymentService,
    private readonly queueService: IQueueService
  ){}

  async execute(props: CreateWalletPaymentDto): Promise<Error | CreateWalletPaymentReturn> {
    const wallet = await this.walletRepo.findById(props.wallet_id)

    if (!wallet) {
      return new Error("Wallet not found")
    }

    if (!wallet.external_id) {
      return new Error("Wallet does not have a external_id")
    }

    if (props.amount < 100) {
      return new Error("Payment amount less than 1 cent")
    }

    if (
      wallet.transactions
        .filter(transaction => transaction.status === TransactionStatus.PENDING_PAYMENT)
      .length >= 6
    ) {
      console.error("Partner has already 3 or more pending payment transactions")
      return new Error("Partner has already 3 or more pending payment transactions")
    }

    const createPaymentResult = await this.paymentService.generatePixPayment({
      wallet_id: wallet.external_id,
      amount: props.amount
    })

    if (createPaymentResult instanceof Error) {
      console.error("Error generating payment: ", createPaymentResult)
      return createPaymentResult
    }

    const { transaction_id, qr_code, pix_copy_paste_code } = createPaymentResult

    const transaction = new Transaction({
      wallet_id: wallet.id,
      external_id: transaction_id,
      status: TransactionStatus.PENDING_PAYMENT,
      type: TransactionType.INCOME,
      amount: props.amount,
      bonus_amount: wallet.transactions.length === 0 ? FIRST_TRANSACTION_BONUS : undefined,
      operator_id: props.operator_id
    })
    await this.transactionRepo.create(transaction)

    if (wallet.transactions.length === 0) {
      const VERIFY_ACCOUNT_CONFIRMATION_DELAY = 30 * 60 * 1000 // 30 minutos

      await this.queueService.add({
        name: "verify_account_confirmation",
        data: {
          transaction_id: transaction.id,
          partner_id: wallet.partner_id
        },
        delay: VERIFY_ACCOUNT_CONFIRMATION_DELAY
      })
    }

    return {
      transaction_id: transaction.id,
      qr_code,
      pix_copy_paste_code
    }
  }
}