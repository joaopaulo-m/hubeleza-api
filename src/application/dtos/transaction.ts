import type { LeadDto } from "./lead"

export interface TransactionDto {
  id: string
  wallet_id: string
  status: string
  type: string
  amount: number
  created_at: number
  lead_price?: number
  lead?: LeadDto
  bonus_amount?: number
}