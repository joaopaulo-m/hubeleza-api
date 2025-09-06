import type { Operator } from "../../../domain/entities/operator";

export interface IOperatorRepository {
  findById: (id: string) => Promise<Operator | null>
  findByEmail: (email: string) => Promise<Operator | null>
  getAll: () => Promise<Operator[]>
  create: (operator: Operator) => Promise<void>
  update: (operator: Operator) => Promise<void>
  delete: (id: string) => Promise<void>
}