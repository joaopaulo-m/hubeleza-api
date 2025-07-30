import type { Partner } from "../../../domain/entities/partner";

export type FindNearestPartnersProps = {
  lat: string, lng: string, limit?: number
}

export interface IPartnerRepository {
  countByTreatment(treatment_id: string): Promise<number>
  countActive(): Promise<number>
  findById: (id: string) => Promise<null | Partner>
  findByPhoneNumber: (phone_number: string) => Promise<null | Partner>
  findNearestPartners: (props: FindNearestPartnersProps) => Promise<Partner[]>
  getAll: () => Promise<Partner[]>
  create: (partner: Partner) => Promise<void>
  update: (partner: Partner) => Promise<void>
  delete: (id: string) => Promise<void>
}
