import { TransactionStatus } from "../../../domain/enums/transaction-status";
import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { IWalletRepository } from "../../contracts/repos/wallet";

export interface ConfirmWalletPaymentDto {
  external_transaction_id: string
}

export class ConfirmWalletPaymentUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly walletRepo: IWalletRepository,
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

    const creditWalletResult = wallet.credit(transaction.amount)

    if (creditWalletResult instanceof Error) {
      console.error("Error crediting wallet: ", creditWalletResult)
    }

    await this.walletRepo.update(wallet)
    await this.transactionRepo.update(transaction)

    return void 0;
  }
}