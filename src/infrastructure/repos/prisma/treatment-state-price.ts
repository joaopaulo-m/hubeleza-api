import type { ITreatmentStatePriceRepository } from "../../../application/contracts/repos/treatment-state-price";
import { TreatmentStatePriceMapper } from "../../../application/mappers/treatment-state-price";
import type { TreatmentStatePrice } from "../../../domain/entities/treatment-state-price";
import { prisma } from "../../services/prisma";

export class PrismaTreatmentStatePriceRepository implements ITreatmentStatePriceRepository {
  async findById(id: string) {
    const treatmentStatePrice = await prisma.treatmentStatePrice.findFirst({
      where: {
        id
      }
    })

    if (!treatmentStatePrice) return null
    return TreatmentStatePriceMapper.toDomain(treatmentStatePrice)
  }

  async create(domain: TreatmentStatePrice) {
    await prisma.treatmentStatePrice.create({
      data: TreatmentStatePriceMapper.toPersistence(domain)
    })
  }

  async update(domain: TreatmentStatePrice) {
    const data = {
      ...TreatmentStatePriceMapper.toPersistence(domain),
      id: undefined,
      treatment_id: undefined
    }

    await prisma.treatmentStatePrice.update({
      where: {
        id: domain.id
      },
      data
    })
  }

  async delete(id: string) {
    await prisma.treatmentStatePrice.delete({
      where: { id }
    })
  }
}