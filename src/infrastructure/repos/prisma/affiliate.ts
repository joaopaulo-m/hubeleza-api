import type { IAffiliateRepository } from "../../../application/contracts/repos/affiliate";
import { AffiliateMapper } from "../../../application/mappers/affiliate";
import type { FetchAffiliatesDto } from "../../../application/use-cases/affiliate/get-all";
import type { Affiliate } from "../../../domain/entities/affiliate";
import { prisma } from "../../services/prisma";

export class PrismaAffiliateRepository implements IAffiliateRepository {
  async findById(affiliate_id: string) {
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        id: affiliate_id
      }
    })

    if (!affiliate) return null
    return AffiliateMapper.toDomain(affiliate)
  }

  async findByEmail(email: string) {
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        email
      }
    })

    if (!affiliate) return null
    return AffiliateMapper.toDomain(affiliate)
  }

  async findByReferralCode(code: string) {
    const affiliate = await prisma.affiliate.findFirst({
      where: {
        referral_code: code
      }
    })

    if (!affiliate) return null
    return AffiliateMapper.toDomain(affiliate)
  }
  
  async getAll(props: FetchAffiliatesDto) {
    const affiliates = await prisma.affiliate.findMany({
      where: {
        name: props.name ? { 
          contains: props.name,
          mode: 'insensitive'
        } : undefined,
        referral_code: props.referral_code ? { 
          contains: props.referral_code,
          mode: 'insensitive'
        } : undefined
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return affiliates.map(AffiliateMapper.toDomain)
  }

  async create(affiliate: Affiliate) {
    const data = AffiliateMapper.toPersistence(affiliate)

    await prisma.affiliate.create({ data })
  }

  async update(affiliate: Affiliate) {
    const data = {
      ...AffiliateMapper.toPersistence(affiliate),
      id: undefined
    }

    await prisma.affiliate.update({
      where: {
        id: affiliate.id
      },
      data
    })
  }

  async delete(affiliate_id: string) {
    await prisma.affiliate.delete({
      where: { id: affiliate_id }
    })
  }
}