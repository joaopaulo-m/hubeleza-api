import type { LeadDto } from "./lead"

export interface TransactionDto {
  id: string
  wallet_id: string
  type: string
  amount: number
  lead_price: number
  created_at: number
  lead?: LeadDto
}