import { Affiliate } from "../../domain/entities/affiliate"
import { Decimal } from "../../generated/prisma/runtime/library"
import type { AffiliateDto } from "../dtos/affiliate"

export type PersistenceAffiliate = {
  id: string
  name: string
  email: string
  password: string
  created_at: bigint
  comission_percentage: Decimal
  referral_code: string
}

export class AffiliateMapper {
  static toDomain(raw: PersistenceAffiliate): Affiliate {
    return new Affiliate({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      referral_code: raw.referral_code,
      comission_percentage: raw.comission_percentage.toNumber(),
      created_at: Number(raw.created_at)
    })
  }

  static toPersistence(domain: Affiliate): PersistenceAffiliate {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      referral_code: domain.referral_code,
      comission_percentage: Decimal(domain.comission_percentage),
      created_at: BigInt(domain.created_at)
    }
  }

  static toDto(domain: Affiliate): AffiliateDto {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      referral_code: domain.referral_code,
      comission_percentage: domain.comission_percentage,
      created_at: domain.created_at,
      password_not_defined: domain.password === 'not-defined'
    }
  }
}