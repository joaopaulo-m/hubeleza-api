import { Treatment } from "../../domain/entities/treatment"
import type { TreatmentCategory } from "../../domain/enums/treatment-category"
import type { TreatmentDto } from "../dtos/treatment"
import { TreatmentStatePriceMapper, type PersistenceTreatmentStatePrice } from "./treatment-state-price"

export type PersistenceTreatment = {
  id: string
  name: string
  category: string
  price: number
  state_prices: PersistenceTreatmentStatePrice[]
}

export class TreatmentMapper {
  static toDomain(raw: PersistenceTreatment): Treatment {
    return new Treatment({
      id: raw.id,
      name: raw.name,
      category: raw.category as TreatmentCategory,
      price: raw.price,
      state_prices: raw.state_prices.map(TreatmentStatePriceMapper.toDomain)
    })
  }

  static toPersistence(domain: Treatment): PersistenceTreatment {
    return {
      id: domain.id,
      name: domain.name,
      category: domain.category,
      price: domain.price,
      state_prices: domain.state_prices.map(TreatmentStatePriceMapper.toPersistence)
    }
  }

  static toDto(domain: Treatment): TreatmentDto {
    return {
      id: domain.id,
      name: domain.name,
      category: domain.category,
      price: domain.price,
      state_prices: domain.state_prices.map(TreatmentStatePriceMapper.toDto)
    }
  }
}