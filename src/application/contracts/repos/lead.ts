import type { Lead } from "../../../domain/entities/lead";

export interface FetchLeadsOptions {
  page: number
  name?: string
  treatment_ids?: string[]
  start_date?: number
  end_date?: number
}

export interface ILeadRepository {
  countByTreatment: (treatment_id: string) => Promise<number>
  countAll: () => Promise<number>
  countAllDispatches(): Promise<number>
  countConverted: () => Promise<number>
  countByPartnerId(partner_id: string): Promise<number>
  countByPartnerPerTreatment(partner_id: string): Promise<{ treatment: string; count: number }[]>
  findById: (id: string) => Promise<null | Lead>
  findByPhoneNumber: (phone_number: string) => Promise<null | Lead>
  findRecentLeads: (limit?: number) => Promise<RecentLead[]>
  getAllByPartnerId: (partner_id: string, options?: FetchLeadsOptions ) => Promise<{ items: Lead[], total: number }>
  getAll: () => Promise<Lead[]>
  create: (lead: Lead) => Promise<void>
  update: (lead: Lead) => Promise<void>
  delete: (id: string) => Promise<void>
}

export type RecentLead = {
  name: string
  treatments: string[]
  phone_number: string
  status: 'Enviado' | 'Pendente'
  created_at: number
}