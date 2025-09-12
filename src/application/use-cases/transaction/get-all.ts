import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { TransactionDto } from "../../dtos/transaction";
import { TransactionMapper } from "../../mappers/transaction";

export interface GetTransactionsDto {
  page?: number
  limit?: number
  partner_name?: string
  lead_name?: string
  type?: string
  status?: string
  min_amount?: number
  max_amount?: number
  start_date?: number
  end_date?: number
}

export interface GetTransactionsReturn {
  items: TransactionDto[]
  total_items: number
  limit: number
  page: number
}

export class GetTransactionsUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository
  ){}

  async execute(props: GetTransactionsDto): Promise<GetTransactionsReturn> {
    const transactions = await this.transactionRepo.getAll({
      ...props,
      limit: props.limit || 20,
      page: props.page || 1
    })
    const count = await this.transactionRepo.countAll()

    return {
      items: transactions.map(TransactionMapper.toDto),
      total_items: count,
      limit: props.limit || 20,
      page: props.page || 1
    }
  }
}