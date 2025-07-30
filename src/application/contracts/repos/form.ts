import type { Form } from "../../../domain/entities/form";

export interface IFormRepository {
  countByTreatment: (treatment_id: string) => Promise<number>
  countAll: () => Promise<number>
  findByExternalId: (id: string) => Promise<null | Form>
  findById: (id: string) => Promise<null | Form>
  getAll: () => Promise<Form[]>
  create: (form: Form) => Promise<void>
  update: (form: Form) => Promise<void>
  delete: (id: string) => Promise<void>
}