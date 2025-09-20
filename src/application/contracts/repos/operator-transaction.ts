import type { OperatorTransaction } from "../../../domain/entities/operator-transaction";
import type { ComissionType } from "../../../shared/enums/comission-type";
import type { GetOperatorTransactionsDto } from "../../use-cases/operator-transaction/get-all";

export interface IOperatorTransactionRepository {
  countAllAmount: ({ operator_id, comission_type }: { operator_id: string, comission_type: ComissionType }) => Promise<number>
  fetch: (props: GetOperatorTransactionsDto) => Promise<OperatorTransaction[]>
  create: (operator_transaction: OperatorTransaction) => Promise<void>
}