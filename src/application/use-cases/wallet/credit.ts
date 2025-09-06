import { Transaction } from "../../../domain/entities/transaction";
import { TransactionStatus } from "../../../domain/enums/transaction-status";
import { TransactionType } from "../../../domain/enums/transaction-type";
import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { IWalletRepository } from "../../contracts/repos/wallet";

export interface CreditWalletDto {
  wallet_id: string
  amount: number
}

export class CreditWalletUseCase {
  constructor(
    private readonly walletRepo: IWalletRepository,
    private readonly transactionRepo: ITransactionRepository
  ){}

  async execute(props: CreditWalletDto): Promise<Error | void> {
    const wallet = await this.walletRepo.findById(props.wallet_id)

    if (!wallet) {
      return new Error("Wallet not found")
    }

    const creditWalletResult = wallet.credit(props.amount)
    if (creditWalletResult instanceof Error) {
      return creditWalletResult
    }

    const transaction = new Transaction({
      wallet_id: wallet.id,
      type: TransactionType.INCOME,
      status: TransactionStatus.PAID,
      amount: 0,
      bonus_amount: props.amount,
    })

    await this.walletRepo.update(wallet)
    await this.transactionRepo.create(transaction)
    
    return void 0;
  }
}