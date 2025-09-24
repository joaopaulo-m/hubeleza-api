import { GetAffiliateWalletByAffiliateIdUseCase } from "../../../application/use-cases/affiliate-wallet/get-by-affiliate"
import { GetAffiliateWalletByAffiliateIdController } from "../../../infrastructure/controllers/affiliate-wallet/get-by-affiliate"
import { PrismaAffiliateWalletRepository } from "../../../infrastructure/repos/prisma/affiliate-wallet"

export const makeGetAffiliateWalletByAffiliateIdController = () => {
  const affiliateWalletRepo = new PrismaAffiliateWalletRepository()
  const useCase = new GetAffiliateWalletByAffiliateIdUseCase(affiliateWalletRepo)
  return new GetAffiliateWalletByAffiliateIdController(useCase)
}