import type { Admin } from "../../../domain/entities/admin"

export interface IAdminRepository {
  countAll: () => Promise<number>
  findById: (id: string) => Promise<null | Admin>
  findByEmail: (email: string) => Promise<null | Admin>
  getAll: () => Promise<Admin[]>
  create: (admin: Admin) => Promise<void>
  update: (admin: Admin) => Promise<void>
  delete: (id: string) => Promise<void>
}