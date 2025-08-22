import { randomUUID } from "node:crypto";

import type { FindNearestPartnersProps, IPartnerRepository } from "../../../application/contracts/repos/partner";
import { PartnerMapper } from "../../../application/mappers/partner";
import type { Partner } from "../../../domain/entities/partner";
import { prisma } from "../../services/prisma";

export class PrismaPartnerRepository implements IPartnerRepository {
  async countAll(): Promise<number> {
    return prisma.partner.count();
  }

  async countByTreatment(treatment_id: string): Promise<number> {
    return await prisma.partner.count({
      where: {
        partners_treatments: {
          some: {
            treatment_id
          }
        }
      }
    })
  }

  async countActive(): Promise<number> {
    return await prisma.partner.count({
      where: {
        partners_treatments: { some: {} }
      }
    })
  }

  async getTopPartnersByLeadCount(limit: number): Promise<{ partner_name: string, total_leads: number }[]> {
    const raw = await prisma.$queryRawUnsafe<
      { partner_name: string, total_leads: number }[]
    >(`
      SELECT p.name AS partner_name, COUNT(ld.id) AS total_leads
      FROM leads_dispatch ld
      JOIN partners p ON p.id = ld.partner_id
      GROUP BY p.name
      ORDER BY total_leads DESC
      LIMIT $1
    `, limit);
  
    return raw.map(row => ({
      partner_name: row.partner_name,
      total_leads: Number(row.total_leads)
    }));
  }

  async findById(id: string) {
    const partner = await prisma.partner.findUnique({
      where: {
        id
      },
      include: {
        partners_treatments: {
          include: {
            treatment: true
          }
        }
      }
    });

    if (!partner) return null;

    return PartnerMapper.toDomain(partner);
  }

  async findByEmail(email: string) {
    const partner = await prisma.partner.findFirst({
      where: {
        email
      },
      include: {
        partners_treatments: {
          include: {
            treatment: true
          }
        }
      }
    });

    if (!partner) return null;

    return PartnerMapper.toDomain(partner);
  }

  async findByPhoneNumber(phone_number: string) {
    const partner = await prisma.partner.findFirst({
      where: {
        phone_number
      },
      include: {
        partners_treatments: {
          include: {
            treatment: true
          }
        }
      }
    });

    if (!partner) return null;

    return PartnerMapper.toDomain(partner);
  }

  async findNearestPartners({ lat, lng, limit = 5, lead_price }: FindNearestPartnersProps) {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
  
    const rawPartners = await prisma.$queryRawUnsafe<any[]>(`
      SELECT p.*,
        (
          111.045 * DEGREES(ACOS(LEAST(1.0,
            COS(RADIANS($1)) * COS(RADIANS(p.lat::float)) *
            COS(RADIANS(p.lng::float) - RADIANS($2)) +
            SIN(RADIANS($1)) * SIN(RADIANS(p.lat::float))
          )))
        ) AS distance
      FROM partners p
      JOIN wallets w ON w.partner_id = p.id
      WHERE w.balance >= $3
      ORDER BY distance
      LIMIT $4
    `, parsedLat, parsedLng, lead_price, limit);
  
    const partnerIds = rawPartners.map(p => p.id);
  
    const partnersWithTreatments = await prisma.partner.findMany({
      where: {
        id: { in: partnerIds }
      },
      include: {
        partners_treatments: {
          include: {
            treatment: true
          }
        }
      }
    });
  
    const mapById = new Map(partnersWithTreatments.map(p => [p.id, p]));
  
    const result = rawPartners.map(partnerRaw => {
      const fullPartner = mapById.get(partnerRaw.id);
      if (!fullPartner) return null;
      return PartnerMapper.toDomain(fullPartner);
    }).filter(Boolean) as ReturnType<typeof PartnerMapper.toDomain>[];
  
    return result;
  }

  async getAll() {
    const partners = await prisma.partner.findMany({
      include: {
        partners_treatments: {
          include: {
            treatment: true
          }
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return partners.map(PartnerMapper.toDomain);
  }

  async create(partner: Partner) {
    const data = {
      ...PartnerMapper.toPersistence(partner),
      partners_treatments: undefined
    };

    await prisma.partner.create({
      data: {
        ...data,
        partners_treatments: {
          createMany: {
            data: partner.treatments.map(t => ({
              id: randomUUID(),
              treatment_id: t.id
            })),
            skipDuplicates: true
          }
        },
      }
    });
  }

  async update(partner: Partner) {
    const data = {
      ...PartnerMapper.toPersistence(partner),
      partners_treatments: undefined
    };

    await prisma.partner.update({
      where: {
        id: partner.id
      },
      data: {
        ...data,
        partners_treatments: {
          deleteMany: {},
          createMany: {
            data: partner.treatments.map(treatment => {
              return {
                id: randomUUID(),
                treatment_id: treatment.id
              }
            })
          }
        }
      }
    });
  }

  async delete(id: string) {
    await prisma.partner.delete({
      where: {
        id
      }
    });
  }
}