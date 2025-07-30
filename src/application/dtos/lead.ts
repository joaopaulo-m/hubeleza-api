import type { TreatmentDto } from "./treatment"

export interface LeadDto {
  id: string
  name: string
  phone_number: string
  cep: string
  created_at: number
  treatments: TreatmentDto[]
}