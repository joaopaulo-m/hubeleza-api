import type { TreatmentStatePrice } from "../../../domain/entities/treatment-state-price";

export interface ITreatmentStatePriceRepository {
  findById: (id: string) => Promise<null | TreatmentStatePrice>
  create: (domain: TreatmentStatePrice) => Promise<void>
  update: (domain: TreatmentStatePrice) => Promise<void>
  delete: (id: string) => Promise<void>
}