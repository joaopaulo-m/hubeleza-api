import { Treatment } from "../../domain/entities/treatment"
import type { TreatmentDto } from "../dtos/treatment"

export type PersistenceTreatment = {
  id: string
  name: string
}

export class TreatmentMapper {
  static toDomain(raw: PersistenceTreatment): Treatment {
    return new Treatment({
      id: raw.id,
      name: raw.name
    })
  }

  static toPersistence(domain: Treatment): PersistenceTreatment {
    return {
      id: domain.id,
      name: domain.name
    }
  }

  static toDto(domain: Treatment): TreatmentDto {
    return {
      id: domain.id,
      name: domain.name
    }
  }
}