import type { OperatorTransactionDto } from "./operator-transaction"

export interface OperatorWalletDto {
  id: string
  operator_id: string
  document: string
  balance: number
  external_id?: string
  transactions: OperatorTransactionDto[]
}
