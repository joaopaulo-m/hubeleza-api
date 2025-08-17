import { Treatment } from "../../domain/entities/treatment"
import type { TreatmentDto } from "../dtos/treatment"

export type PersistenceTreatment = {
  id: string
  name: string
  price: number
}

export class TreatmentMapper {
  static toDomain(raw: PersistenceTreatment): Treatment {
    return new Treatment({
      id: raw.id,
      name: raw.name,
      price: raw.price
    })
  }

  static toPersistence(domain: Treatment): PersistenceTreatment {
    return {
      id: domain.id,
      name: domain.name,
      price: domain.price
    }
  }

  static toDto(domain: Treatment): TreatmentDto {
    return {
      id: domain.id,
      name: domain.name,
      price: domain.price
    }
  }
}