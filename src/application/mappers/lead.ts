import { Lead } from "../../domain/entities/lead"
import type { LeadDto } from "../dtos/lead"
import { TreatmentMapper, type PersistenceTreatment } from "./treatment"

export type PersistenceLead = {
  id: string
  name: string
  phone_number: string
  cep: string
  lat: string
  lng: string
  created_at: bigint
  leads_treatments: {
    treatment: PersistenceTreatment 
  }[]
}

export class LeadMapper {
  static toDomain(raw: PersistenceLead): Lead {
    return new Lead({
      id: raw.id,
      name: raw.name,
      phone_number: raw.phone_number,
      cep: raw.cep,
      lat: raw.lat,
      lng: raw.lng,
      created_at: Number(raw.created_at),
      treatments: raw.leads_treatments.map(t => {
        return TreatmentMapper.toDomain(t.treatment)})
    })
  }

  static toPersistence(domain: Lead): PersistenceLead {
    return {
      id: domain.id,
      name: domain.name,
      phone_number: domain.phone_number,
      cep: domain.cep,
      lat: domain.lat,
      lng: domain.lng,
      created_at: BigInt(domain.created_at),
      leads_treatments: domain.treatments.map(t => {
        return {
          treatment: TreatmentMapper.toPersistence(t)
        }
      })
    }
  }

  static toDto(domain: Lead): LeadDto {
    return {
      id: domain.id,
      name: domain.name,
      phone_number: domain.phone_number,
      cep: domain.cep,
      created_at: domain.created_at,
      treatments: domain.treatments.map(TreatmentMapper.toDto)
    }
  }
}