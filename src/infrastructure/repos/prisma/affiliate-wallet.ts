import type { IAffiliateWalletRepository } from "../../../application/contracts/repos/affiliate-wallet";
import { AffiliateWalletMapper } from "../../../application/mappers/affiliate-wallet";
import type { AffiliateWallet } from "../../../domain/entities/affiliate-wallet";
import { prisma } from "../../services/prisma";

export class PrismaAffiliateWalletRepository implements IAffiliateWalletRepository {
  async findByAffiliateId(affiliate_id: string) {
    const affiliateWallet = await prisma.affiliateWallet.findFirst({
      where: {
        affiliate_id
      }
    })

    if (!affiliateWallet) return null
    return AffiliateWalletMapper.toDomain(affiliateWallet)
  }

  async create(affiliateWallet: AffiliateWallet) {
    const data = AffiliateWalletMapper.toPersistence(affiliateWallet)

    await prisma.affiliateWallet.create({ data })
  }

  async update(affiliateWallet: AffiliateWallet) {
    const data = {
      ...AffiliateWalletMapper.toPersistence(affiliateWallet),
      id: undefined,
      affiliate_id: undefined
    }

    await prisma.affiliateWallet.update({
      where: {
        id: affiliateWallet.id
      },
      data
    })
  }
}