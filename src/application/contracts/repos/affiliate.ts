import type { Affiliate } from "../../../domain/entities/affiliate";
import type { FetchAffiliatesDto } from "../../use-cases/affiliate/get-all";

export interface IAffiliateRepository {
  findById: (id: string) => Promise<null | Affiliate>
  findByEmail: (email: string) => Promise<null | Affiliate>
  findByReferralCode: (code: string) => Promise<null | Affiliate>
  getAll: (props: FetchAffiliatesDto) => Promise<Affiliate[]>
  update: (affiliate: Affiliate) => Promise<void>
  create: (affiliate: Affiliate) => Promise<void>
  delete: (id: string) => Promise<void>
}