import { TreatmentStatePrice } from "../../domain/entities/treatment-state-price"
import type { State } from "../../domain/enums/state"
import type { TreatmentStatePriceDto } from "../dtos/treatment-state-price"

export type PersistenceTreatmentStatePrice = {
  id: string
  treatment_id: string
  state: string
  price: number
}

export class TreatmentStatePriceMapper {
  static toDomain(raw: PersistenceTreatmentStatePrice): TreatmentStatePrice {
    return new TreatmentStatePrice({
      id: raw.id,
      treatment_id: raw.treatment_id,
      state: raw.state as State,
      price: raw.price
    })
  }

  static toPersistence(domain: TreatmentStatePrice): PersistenceTreatmentStatePrice {
    return {
      id: domain.id,
      treatment_id: domain.treatment_id,
      state: domain.state,
      price: domain.price
    }
  }

  static toDto(domain: TreatmentStatePrice): TreatmentStatePriceDto {
    return {
      id: domain.id,
      treatment_id: domain.treatment_id,
      state: domain.state,
      price: domain.price
    }
  }
}