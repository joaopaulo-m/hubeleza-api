import { Operator } from "../../domain/entities/operator"
import type { OperatorDto } from "../dtos/operator"

export type PersistenceOperator = {
  id: string
  name: string
  email: string
  password: string
  created_at: bigint
  created_by: string
}

export class OperatorMapper {
  static toDomain(raw: PersistenceOperator): Operator {
    return new Operator({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      created_by: raw.created_by,
      created_at: Number(raw.created_at)
    })
  }

  static toPersistence(domain: Operator): PersistenceOperator {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      created_by: domain.created_by,
      created_at: BigInt(domain.created_at)
    }
  }

  static toDto(domain: Operator): OperatorDto {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      created_by: domain.created_by,
      created_at: domain.created_at
    }
  }
}