export interface InviteTokenDto {
  id: string
  name: string
  phone_number: string
  token: string
  created_at: number
  operator_id?: string
  transaction_id?: string
}