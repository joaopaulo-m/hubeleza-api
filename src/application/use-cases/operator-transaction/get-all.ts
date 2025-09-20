import type { IOperatorTransactionRepository } from "../../contracts/repos/operator-transaction";
import type { OperatorTransactionDto } from "../../dtos/operator-transaction";
import { OperatorTransactionMapper } from "../../mappers/operator-transaction";

export interface GetOperatorTransactionsDto {
  operator_id: string
  partner_name?: string
  type?: string
  start_date?: number
  end_date?: number
}

export class GetOperatorTransactionsUseCase {
  constructor(
    private readonly operatorTransactionRepo: IOperatorTransactionRepository
  ){}

  async execute(props: GetOperatorTransactionsDto): Promise<OperatorTransactionDto[]> {
    const operatorTransactions = await this.operatorTransactionRepo.fetch(props)

    return operatorTransactions.map(OperatorTransactionMapper.toDto)
  }
}