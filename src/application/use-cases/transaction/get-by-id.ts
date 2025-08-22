import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { TransactionDto } from "../../dtos/transaction";
import { TransactionMapper } from "../../mappers/transaction";

export class GetTransactionByIdUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository
  ){}

  async execute(id: string): Promise<Error | TransactionDto> {
    const transaction = await this.transactionRepo.findById(id)

    if (!transaction) {
      return new Error("Transaction not found")
    }

    return TransactionMapper.toDto(transaction)
  }
}