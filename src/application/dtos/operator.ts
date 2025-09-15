export interface OperatorDto {
  id: string
  name: string
  email: string
  created_at: number
  created_by: string
  password_not_defined?: boolean
  sign_up_comission_percentage?: number
  topup_comission_percentage?: number
}