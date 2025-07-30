import type { Lead } from "../../../domain/entities/lead";

export interface ILeadRepository {
  countByTreatment: (treatment_id: string) => Promise<number>
  countAll: () => Promise<number>
  countConverted: () => Promise<number>
  findById: (id: string) => Promise<null | Lead>
  findByPhoneNumber: (phone_number: string) => Promise<null | Lead>
  findRecentLeads: (limit?: number) => Promise<RecentLead[]>
  getAll: () => Promise<Lead[]>
  create: (lead: Lead) => Promise<void>
  update: (lead: Lead) => Promise<void>
  delete: (id: string) => Promise<void>
}

export type RecentLead = {
  name: string
  treatment: string
  phone_number: string
  status: 'Enviado' | 'Pendente'
  created_at: number
}