import { Operator } from "../../domain/entities/operator"
import type { OperatorDto } from "../dtos/operator"

export type PersistenceOperator = {
  id: string
  name: string
  email: string
  password: string
  created_at: bigint
  created_by: string
  sign_up_comission_percentage: number | null
  topup_comission_percentage: number | null
}

export class OperatorMapper {
  static toDomain(raw: PersistenceOperator): Operator {
    return new Operator({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      created_by: raw.created_by,
      created_at: Number(raw.created_at),
      sign_up_comission_percentage: raw.sign_up_comission_percentage || undefined,
      topup_comission_percentage: raw.topup_comission_percentage || undefined
    })
  }

  static toPersistence(domain: Operator): PersistenceOperator {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      created_by: domain.created_by,
      created_at: BigInt(domain.created_at),
      sign_up_comission_percentage: domain.sign_up_comission_percentage || null,
      topup_comission_percentage: domain.topup_comission_percentage || null
    }
  }

  static toDto(domain: Operator): OperatorDto {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      created_by: domain.created_by,
      created_at: domain.created_at,
      password_not_defined: domain.password === "not-defined" ? true : undefined,
      sign_up_comission_percentage: domain.sign_up_comission_percentage,
      topup_comission_percentage: domain.topup_comission_percentage
    }
  }
}