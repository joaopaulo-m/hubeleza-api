import type { Treatment } from "../../../domain/entities/treatment";

export interface ITreatmentRepository {
  findByName: (name: string) => Promise<null | Treatment>
  findById: (id: string) => Promise<null | Treatment>
  getTreatmentPerformance: () => Promise<TreatmentPerformance[]>
  getAll: () => Promise<Treatment[]>
  create: (treatment: Treatment) => Promise<void>
  update: (treatment: Treatment) => Promise<void>
  delete: (id: string) => Promise<void>
}

export type TreatmentPerformance = {
  treatment: string
  total_leads: number
  total_partners: number
}