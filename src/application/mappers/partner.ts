import { Partner } from "../../domain/entities/partner"
import type { PartnerDto } from "../dtos/partner"
import { TreatmentMapper, type PersistenceTreatment } from "./treatment"

export type PersistencePartner = {
  id: string
  name: string
  email: string
  password: string
  created_at: bigint
  phone_number: string
  cep: string
  lat: string
  lng: string
  partners_treatments: { treatment: PersistenceTreatment }[]
}

export class PartnerMapper {
  static toDomain(raw: PersistencePartner): Partner {
    return new Partner({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      created_at: Number(raw.created_at),
      phone_number: raw.phone_number,
      cep: raw.cep,
      lat: raw.lat,
      lng: raw.lng,
      treatments: raw.partners_treatments.map(pt => TreatmentMapper.toDomain(pt.treatment))
    })
  }
  
  static toPersistence(domain: Partner): PersistencePartner {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      created_at: BigInt(domain.created_at),
      phone_number: domain.phone_number,
      cep: domain.cep,
      lat: domain.lat,
      lng: domain.lng,
      partners_treatments: domain.treatments.map(t => ({
        treatment: TreatmentMapper.toPersistence(t)
      }))
    }
  }

  static toDto(domain: Partner): PartnerDto {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      created_at: domain.created_at,
      phone_number: domain.phone_number,
      cep: domain.cep,
      lat: domain.lat,
      lng: domain.lng,
      treatments: domain.treatments.map(TreatmentMapper.toDto),
      password_not_defined: domain.password === "not-defined" ? true : undefined
    }
  }
}