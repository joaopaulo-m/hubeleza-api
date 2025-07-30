import type { TreatmentDto } from "./treatment"

export interface PartnerDto {
  id: string
  name: string
  phone_number: string
  cep: string
  lat: string
  lng: string
  treatments: TreatmentDto[]
}