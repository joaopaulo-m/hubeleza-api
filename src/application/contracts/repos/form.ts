import type { Form } from "../../../domain/entities/form";

export interface FetchFormsOptions {
  name?: string
  treatment_ids?: string[]
}

export interface IFormRepository {
  countByTreatment: (treatment_id: string) => Promise<number>
  countAll: () => Promise<number>
  findByExternalId: (id: string) => Promise<null | Form>
  findById: (id: string) => Promise<null | Form>
  getAll: (options: FetchFormsOptions) => Promise<Form[]>
  create: (form: Form) => Promise<void>
  update: (form: Form) => Promise<void>
  delete: (id: string) => Promise<void>
}