import { randomUUID } from "node:crypto";

import type { ILeadRepository, RecentLead } from "../../../application/contracts/repos/lead";
import { LeadMapper } from "../../../application/mappers/lead";
import type { Lead } from "../../../domain/entities/lead";
import { prisma } from "../../services/prisma";

export class PrismaLeadRepository implements ILeadRepository {
  async countByTreatment(treatment_id: string): Promise<number> {
    return await prisma.lead.count({
      where: {
        leads_treatments: {
          some: {
            treatment_id
          }
        }
      }
    })
  }

  async countAll(): Promise<number> {
    return prisma.lead.count()
  }

  async countConverted(): Promise<number> {
    const converted = await prisma.leadDispatch.findMany({
      distinct: ['lead_id'],
      select: { lead_id: true },
    })
  
    return converted.length
  }

  async findById(id: string) {
    const lead = await prisma.lead.findUnique({
      where: {
        id
      },
      include: {
        leads_treatments: {
          include: {
            treatment: true
          }
        }
      }
    });

    if (!lead) return null;

    return LeadMapper.toDomain(lead);
  }

  async findByPhoneNumber(phone_number: string) {
    const lead = await prisma.lead.findFirst({
      where: {
        phone_number
      },
      include: {
        leads_treatments: {
          include: {
            treatment: true
          }
        }
      }
    });

    if (!lead) return null;

    return LeadMapper.toDomain(lead);
  }

  async findRecentLeads(limit: number = 5): Promise<RecentLead[]> {
    const dispatches = await prisma.leadDispatch.findMany({
      orderBy: { created_at: 'desc' },
      take: limit,
      include: {
        lead: true,
        treatment: true
      }
    })

    const seen = new Set<string>()

    return dispatches
      .filter(d => {
        if (seen.has(d.lead_id)) return false
        seen.add(d.lead_id)
        return true
      })
      .map(d => ({
        name: d.lead.name,
        treatment: d.treatment.name,
        phone_number: d.lead.phone_number,
        status: d.message_sent ? 'Enviado' : 'Pendente',
        created_at: Number(d.created_at),
      }))
  }

  async getAll() {
    const leads = await prisma.lead.findMany({
      include: {
        leads_treatments: {
          include: {
            treatment: true
          }
        }
      }
    });

    return leads.map(LeadMapper.toDomain);
  }

  async create(lead: Lead) {
    const data = {
      ...LeadMapper.toPersistence(lead),
      leads_treatments: undefined
    }

    await prisma.lead.create({
      data: {
        ...data,
        leads_treatments: {
          createMany: {
            data: lead.treatments.map(t => ({
              id: randomUUID(),
              treatment_id: t.id
            })),
            skipDuplicates: true
          }
        },
      }
    });
  }

  async update(lead: Lead) {
    const data = {
      ...LeadMapper.toPersistence(lead),
      leads_treatments: undefined
    }

    await prisma.lead.update({
      where: {
        id: lead.id
      },
      data: {
        ...data,
        leads_treatments: {
          deleteMany: {},
          createMany: {
            data: lead.treatments.map(t => ({
              id: randomUUID(),
              treatment_id: t.id
            })),
            skipDuplicates: true
          }
        }
      }
    });
  }

  async delete(id: string) {
    await prisma.lead.delete({
      where: {
        id
      }
    });
  }
}