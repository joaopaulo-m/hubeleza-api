import { randomUUID } from "node:crypto";

import type { FetchLeadsOptions, ILeadRepository, RecentLead } from "../../../application/contracts/repos/lead";
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

  async countAllDispatches(): Promise<number> {
    return prisma.leadDispatch.count();
  }

  async countConverted(): Promise<number> {
    const converted = await prisma.leadDispatch.findMany({
      distinct: ['lead_id'],
      select: { lead_id: true },
    })
  
    return converted.length
  }

  async countByPartnerId(partner_id: string): Promise<number> {
    return await prisma.leadDispatch.count({
      where: {
        partner_id
      }
    })
  }

  async countByPartnerPerTreatment(partner_id: string) {
    const raw = await prisma.$queryRawUnsafe<
      { treatment: string; count: number }[]
    >(`
      SELECT t.name AS treatment, COUNT(*) AS count
      FROM leads_dispatch ld
      JOIN leads_dispatch_treatments ldt ON ld.id = ldt.lead_dispatch_id
      JOIN treatments t ON t.id = ldt.treatment_id
      WHERE ld.partner_id = $1
      GROUP BY t.name
    `, partner_id);
  
    return raw.map(count => ({
      treatment: count.treatment,
      count: Number(count.count)
    }));
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
        treatments: {
          include: {
            treatment: true
          }
        }
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
        treatments: d.treatments.map(t => t.treatment.name),
        phone_number: d.lead.phone_number,
        status: d.message_sent ? 'Enviado' : 'Pendente',
        created_at: Number(d.created_at),
      }))
  }

  async getAllByPartnerId(partner_id: string, options?: FetchLeadsOptions) {
    const leads = await prisma.lead.findMany({
      where: {
        name: options?.name
          ? {
              contains: options.name,
              mode: "insensitive"
            }
          : undefined,
        leads_dispatch: {
          some: {
            partner_id
          }
        },
        leads_treatments: {
          some: {
            treatment_id: {
              in: options?.treatment_ids
            }
          }
        },
        created_at: {
          gte: options?.start_date,
          lte: options?.end_date
        }
      },
      include: {
        leads_treatments: {
          include: {
            treatment: true
          }
        },
      },
      take: 20,
      skip: options ? 20 * (options?.page - 1) : undefined,
      orderBy: {
        created_at: 'desc'
      }
    });

    return {
      items: leads.map(LeadMapper.toDomain),
      total: await prisma.lead.count({ where: { leads_dispatch: { some: { partner_id } } } })
    };
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