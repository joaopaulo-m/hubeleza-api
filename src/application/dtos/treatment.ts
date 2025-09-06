import type { TreatmentCategory } from "../../domain/enums/treatment-category"
import type { TreatmentStatePriceDto } from "./treatment-state-price"

export interface TreatmentDto {
  id: string
  name: string
  category: TreatmentCategory
  price: number
  state_prices: TreatmentStatePriceDto[]
}