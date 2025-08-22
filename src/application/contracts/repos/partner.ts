import type { Partner } from "../../../domain/entities/partner";

export type FindNearestPartnersProps = {
  lat: string, lng: string, limit?: number, lead_price: number
}

export interface IPartnerRepository {
  countAll(): Promise<number>
  countByTreatment(treatment_id: string): Promise<number>
  countActive(): Promise<number>
  getTopPartnersByLeadCount(limit: number): Promise<{ partner_name: string, total_leads: number }[]>
  findById: (id: string) => Promise<null | Partner>
  findByEmail: (email: string) => Promise<null | Partner>
  findByPhoneNumber: (phone_number: string) => Promise<null | Partner>
  findNearestPartners: (props: FindNearestPartnersProps) => Promise<Partner[]>
  getAll: () => Promise<Partner[]>
  create: (partner: Partner) => Promise<void>
  update: (partner: Partner) => Promise<void>
  delete: (id: string) => Promise<void>
}
