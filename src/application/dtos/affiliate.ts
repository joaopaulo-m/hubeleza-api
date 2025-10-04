export interface AffiliateDto {
  id: string
  name: string
  email: string
  created_at: number
  status: string
  phone_number: string
  ig_username: string
  comission_percentage: number
  lead_comission_amount?: number
  referral_code: string
  password_not_defined?: boolean
}