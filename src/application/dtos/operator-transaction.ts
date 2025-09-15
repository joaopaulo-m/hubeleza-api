import type { TransactionType } from "../../domain/enums/transaction-type"

export interface OperatorTransactionDto {
  id: string
  operator_wallet_id: string
  type: TransactionType
  amount: number
  created_at: number
  external_id?: string
  comission_percentage?: number
}