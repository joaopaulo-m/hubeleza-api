import { Admin } from "../../domain/entities/admin"
import type { AdminDto } from "../dtos/admin"

export type PersistenceAdmin = {
  id: string
  name: string
  email: string
  password: string
  created_at: bigint
  superadmin: boolean
}

export class AdminMapper {
  static toDomain(raw: PersistenceAdmin): Admin {
    return new Admin({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      created_at: Number(raw.created_at),
      superadmin: raw.superadmin,
    })
  }

  static toPersistence(domain: Admin): PersistenceAdmin {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      created_at: BigInt(domain.created_at),
      superadmin: domain.superadmin
    }
  }

  static toDto(admin: Admin): AdminDto {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      created_at: admin.created_at,
      superadmin: admin.superadmin,
      password_not_defined: admin.password === "not-defined" ? true : undefined
    }
  }
}