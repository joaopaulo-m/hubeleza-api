import type { TransactionDto } from "./transaction"

export interface WalletDto {
  id: string
  partner_id: string
  balance: number
  transactions: TransactionDto[]
}