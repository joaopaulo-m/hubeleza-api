import type { ITreatmentRepository, TreatmentPerformance } from "../../../application/contracts/repos/treatment";
import { TreatmentMapper } from "../../../application/mappers/treatment";
import { TreatmentStatePriceMapper } from "../../../application/mappers/treatment-state-price";
import type { FetchTreatmentsDto } from "../../../application/use-cases/treatment/get-all";
import type { Treatment } from "../../../domain/entities/treatment";
import { prisma } from "../../services/prisma";

export class PrismaTreatmentRepository implements ITreatmentRepository {
  async findByName(name: string) {
    const treatment = await prisma.treatment.findFirst({
      where: {
        name
      },
      include: {
        state_prices: true
      }
    });

    if (!treatment) return null;

    return TreatmentMapper.toDomain(treatment);
  }

  async findById(id: string) {
    const treatment = await prisma.treatment.findUnique({
      where: {
        id
      },
      include: {
        state_prices: true
      }
    });

    if (!treatment) return null;

    return TreatmentMapper.toDomain(treatment);
  }

  async countByPartnerId(partner_id: string) {
    return await prisma.partnerTreatment.count({
      where: {
        partner_id
      }
    })
  }

  async getTreatmentPerformance(): Promise<TreatmentPerformance[]> {
    const treatments = await prisma.treatment.findMany({
      include: {
        leads_treatments: true,
        partners_treatments: true
      }
    })

    return treatments.map(t => ({
      treatment: t.name,
      total_leads: t.leads_treatments.length,
      total_partners: t.partners_treatments.length,
    }))
  }

  async getTopTreatmentsByLeadCount(limit: number): Promise<{ name: string, total_leads: number }[]> {
    const results = await prisma.treatment.findMany({
      take: limit,
      orderBy: {
        leads_treatments: {
          _count: 'desc'
        }
      },
      select: {
        name: true,
        leads_treatments: true
      }
    });
  
    return results.map(t => ({
      name: t.name,
      total_leads: t.leads_treatments.length
    }));
  }

  async getAll(props?: FetchTreatmentsDto) {
    const treatments = await prisma.treatment.findMany({
      where: {
        name: props?.name
          ? {
              contains: props.name,
              mode: "insensitive"
            }
          : undefined,
        category: props?.category
      },
      include: {
        state_prices: true
      }
    });

    return treatments.map(TreatmentMapper.toDomain);
  }

  async create(treatment: Treatment) {
    const data = {
      ...TreatmentMapper.toPersistence(treatment),
      state_prices: undefined
    }

    await prisma.treatment.create({
      data: {
        ...data,
        state_prices: {
          createMany: {
            data: treatment.state_prices.map(statePrice => ({
              ...TreatmentStatePriceMapper.toPersistence(statePrice),
              treatment_id: undefined
            })),
            skipDuplicates: true
          }
        }
      }
    });
  }

  async update(treatment: Treatment) {
    const data = {
      ...TreatmentMapper.toPersistence(treatment),
      id: undefined,
      state_prices: undefined
    };

    await prisma.treatment.update({
      where: {
        id: treatment.id
      },
      data
    });
  }

  async delete(id: string) {
    await prisma.treatment.delete({
      where: {
        id
      }
    });
  }
}