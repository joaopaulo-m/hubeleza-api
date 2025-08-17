export interface AdminDto {
  id: string
  name: string
  email: string
  created_at: number
  superadmin: boolean
  password_not_defined?: boolean
}