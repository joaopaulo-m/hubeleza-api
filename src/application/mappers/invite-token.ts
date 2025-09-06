import { InviteToken } from "../../domain/entities/invite-token"
import type { InviteTokenDto } from "../dtos/invite-token"

export type PersistenceInviteToken = {
  id: string
  name: string
  phone_number: string
  token: string
  expires_at: bigint
  created_at: bigint
}

export class InviteTokenMapper {
  static toDomain(raw: PersistenceInviteToken): InviteToken {
    return new InviteToken({
      id: raw.id,
      name: raw.name,
      phone_number: raw.phone_number,
      token: raw.token,
      expires_at: Number(raw.expires_at),
      created_at: Number(raw.created_at)
    })
  }

  static toPersistence(domain: InviteToken): PersistenceInviteToken {
    return {
      id: domain.id,
      name: domain.name,
      phone_number: domain.phone_number,
      token: domain.token,
      expires_at: BigInt(domain.expires_at),
      created_at: BigInt(domain.created_at)
    }
  }

  static toDto(domain: InviteToken): InviteTokenDto {
    return {
      id: domain.id,
      name: domain.name,
      phone_number: domain.phone_number,
      token: domain.token,
      expires_at: domain.expires_at,
      created_at: domain.created_at
    }
  }
}