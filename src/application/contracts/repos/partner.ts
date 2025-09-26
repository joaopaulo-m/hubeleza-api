import type { Partner } from "../../../domain/entities/partner";
import type { FetchPartersDto } from "../../use-cases/partner/get-all";

export type FindNearestPartnersProps = {
  lat: string, lng: string, limit?: number
}

export interface IPartnerRepository {
  countAll(): Promise<number>
  countByTreatment(treatment_id: string): Promise<number>
  countByOperator(operator_id: string): Promise<number>
  countByAffiliate(affiliate_id: string): Promise<number>
  countActive(): Promise<number>
  getTopPartnersByLeadCount(limit: number): Promise<{ partner_name: string, total_leads: number }[]>
  findById: (id: string) => Promise<null | Partner>
  findByEmail: (email: string) => Promise<null | Partner>
  findByPhoneNumber: (phone_number: string) => Promise<null | Partner>
  findByCpf: (cpf: string) => Promise<null | Partner>
  findNearestPartners: (props: FindNearestPartnersProps) => Promise<Partner[]>
  getAll: (props?: FetchPartersDto) => Promise<Partner[]>
  create: (partner: Partner) => Promise<void>
  update: (partner: Partner) => Promise<void>
  delete: (id: string) => Promise<void>
}
