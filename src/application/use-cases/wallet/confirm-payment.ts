import { TransactionStatus } from "../../../domain/enums/transaction-status";
import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { IWalletRepository } from "../../contracts/repos/wallet";
import type { ConfirmPartnerAccountUseCase } from "../partner/confirm-account";

export interface ConfirmWalletPaymentDto {
  external_transaction_id: string
}

export class ConfirmWalletPaymentUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly walletRepo: IWalletRepository,
    private readonly confirmPartnerAccountUseCase: ConfirmPartnerAccountUseCase
  ){}

  async execute(props: ConfirmWalletPaymentDto): Promise<Error | void> {
    const transaction = await this.transactionRepo.findByExternalId(props.external_transaction_id)

    if (!transaction) {
      return new Error("Transaction not found")
    }

    if (transaction.status === TransactionStatus.PAID) {
      console.error("Transaction already paid: ", transaction.id)
      return new Error("Transaction already paid")
    }

    const wallet = await this.walletRepo.findById(transaction.wallet_id)

    if (!wallet) {
      return new Error("Transaction wallet not found")
    }

    const updateTransactionResult = transaction.updateStatus(
      TransactionStatus.PAID
    )

    if (updateTransactionResult instanceof Error) {
      console.error("Error updating transaction: ", updateTransactionResult)
      return updateTransactionResult
    }

    const creditWalletValue = transaction.bonus_amount ? transaction.amount + transaction.bonus_amount : transaction.amount
    const creditWalletResult = wallet.credit(creditWalletValue)

    if (creditWalletResult instanceof Error) {
      console.error("Error crediting wallet: ", creditWalletResult)
    }

    await this.walletRepo.update(wallet)
    await this.transactionRepo.update(transaction)

    if (wallet.transactions.length === 1) {
      const confirmPartnerAccountResult = await this.confirmPartnerAccountUseCase.execute({
        partner_id: wallet.partner_id
      })

      if (confirmPartnerAccountResult instanceof Error) {
        console.error("Error confirming partner account: ", confirmPartnerAccountResult)
      }
    }

    return void 0;
  }
}