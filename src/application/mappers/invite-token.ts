import { InviteToken } from "../../domain/entities/invite-token"
import type { InviteTokenDto } from "../dtos/invite-token"

export type PersistenceInviteToken = {
  id: string
  name: string
  phone_number: string
  token: string
  created_at: bigint
  operator_id: string | null
  transaction_id: string | null
}

export class InviteTokenMapper {
  static toDomain(raw: PersistenceInviteToken): InviteToken {
    return new InviteToken({
      id: raw.id,
      name: raw.name,
      phone_number: raw.phone_number,
      token: raw.token,
      created_at: Number(raw.created_at),
      operator_id: raw.operator_id ? raw.operator_id : undefined,
      transaction_id: raw.transaction_id ? raw.transaction_id : undefined
    })
  }

  static toPersistence(domain: InviteToken): PersistenceInviteToken {
    return {
      id: domain.id,
      name: domain.name,
      phone_number: domain.phone_number,
      token: domain.token,
      created_at: BigInt(domain.created_at),
      operator_id: domain.operator_id ? domain.operator_id : null,
      transaction_id: domain.transaction_id ? domain.transaction_id : null
    }
  }

  static toDto(domain: InviteToken): InviteTokenDto {
    return {
      id: domain.id,
      name: domain.name,
      phone_number: domain.phone_number,
      token: domain.token,
      created_at: domain.created_at,
      operator_id: domain.operator_id,
      transaction_id: domain.transaction_id
    }
  }
}