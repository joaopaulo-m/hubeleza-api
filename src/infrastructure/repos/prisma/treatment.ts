import type { ITreatmentRepository, TreatmentPerformance } from "../../../application/contracts/repos/treatment";
import { TreatmentMapper } from "../../../application/mappers/treatment";
import type { Treatment } from "../../../domain/entities/treatment";
import { prisma } from "../../services/prisma";

export class PrismaTreatmentRepository implements ITreatmentRepository {
  async findByName(name: string) {
    const treatment = await prisma.treatment.findFirst({
      where: {
        name
      }
    });

    if (!treatment) return null;

    return TreatmentMapper.toDomain(treatment);
  }

  async findById(id: string) {
    const treatment = await prisma.treatment.findUnique({
      where: {
        id
      }
    });

    if (!treatment) return null;

    return TreatmentMapper.toDomain(treatment);
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

  async getAll() {
    const treatments = await prisma.treatment.findMany();

    return treatments.map(TreatmentMapper.toDomain);
  }

  async create(treatment: Treatment) {
    const treatmentData = TreatmentMapper.toPersistence(treatment);

    await prisma.treatment.create({
      data: treatmentData
    });
  }

  async update(treatment: Treatment) {
    const data = {
      ...TreatmentMapper.toPersistence(treatment),
      id: undefined
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