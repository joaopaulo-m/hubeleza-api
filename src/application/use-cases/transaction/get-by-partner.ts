import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { TransactionDto } from "../../dtos/transaction";
import { TransactionMapper } from "../../mappers/transaction";

export class GetPartnerTransactionsUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository
  ){}

  async execute(partner_id: string): Promise<TransactionDto[]> {
    const transactions = await this.transactionRepo.findByPartnerId(partner_id)

    return transactions.map(TransactionMapper.toDto)
  }
}