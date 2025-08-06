import type { TreatmentDto } from "./treatment"

export interface FormDto {
  id: string
  name: string
  external_form_id: string
  treatments: TreatmentDto[]
}