import type { State } from "../../domain/enums/state"

export interface TreatmentStatePriceDto {
  id: string
  treatment_id: string
  state: State
  price: number
}