import { InviteToken } from "../../domain/entities/invite-token"
import type { InviteTokenDto } from "../dtos/invite-token"

export type PersistenceInviteToken = {
  id: string
  name: string
  token: string
  expires_at: bigint
}

export class InviteTokenMapper {
  static toDomain(raw: PersistenceInviteToken): InviteToken {
    return new InviteToken({
      id: raw.id,
      name: raw.name,
      token: raw.token,
      expires_at: Number(raw.expires_at)
    })
  }

  static toPersistence(domain: InviteToken): PersistenceInviteToken {
    return {
      id: domain.id,
      name: domain.name,
      token: domain.token,
      expires_at: BigInt(domain.expires_at)
    }
  }

  static toDto(domain: InviteToken): InviteTokenDto {
    return {
      id: domain.id,
      name: domain.name,
      token: domain.token,
      expires_at: domain.expires_at
    }
  }
}