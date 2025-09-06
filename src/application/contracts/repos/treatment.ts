import type { Treatment } from "../../../domain/entities/treatment";
import type { FetchTreatmentsDto } from "../../use-cases/treatment/get-all";

export interface ITreatmentRepository {
  findByName: (name: string) => Promise<null | Treatment>
  findById: (id: string) => Promise<null | Treatment>
  countByPartnerId: (partner_id: string) => Promise<number>
  getTreatmentPerformance: () => Promise<TreatmentPerformance[]>
  getTopTreatmentsByLeadCount(limit: number): Promise<{ name: string, total_leads: number }[]>
  getAll: (props?: FetchTreatmentsDto) => Promise<Treatment[]>
  create: (treatment: Treatment) => Promise<void>
  update: (treatment: Treatment) => Promise<void>
  delete: (id: string) => Promise<void>
}

export type TreatmentPerformance = {
  treatment: string
  total_leads: number
  total_partners: number
}