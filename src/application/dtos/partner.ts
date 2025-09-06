import type { PartnerStatus } from "../../domain/enums/partner-status"
import type { TreatmentDto } from "./treatment"

export interface PartnerDto {
  id: string
  name: string
  company_name: string
  cpf: string
  cnpj?: string
  status: PartnerStatus
  email: string
  created_at: number;
  phone_number: string
  cep: string
  city: string
  state: string
  lat: string
  lng: string
  treatments: TreatmentDto[]
  password_not_defined?: boolean
}