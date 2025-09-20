import type { TransactionType } from "../../domain/enums/transaction-type"
import type { ComissionType } from "../../shared/enums/comission-type"

export interface OperatorTransactionDto {
  id: string
  operator_wallet_id: string
  type: TransactionType
  amount: number
  created_at: number
  external_id?: string
  comission_percentage?: number
  comission_type?: ComissionType
  partner_id?: string
}