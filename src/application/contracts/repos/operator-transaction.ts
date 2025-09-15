import type { OperatorTransaction } from "../../../domain/entities/operator-transaction";

export interface IOperatorTransactionRepository {
  create: (operator_transaction: OperatorTransaction) => Promise<void>
}