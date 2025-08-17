import type { TreatmentDto } from "./treatment"

export interface PartnerDto {
  id: string
  name: string
  email: string
  created_at: number;
  phone_number: string
  cep: string
  lat: string
  lng: string
  treatments: TreatmentDto[]
  password_not_defined?: boolean
}