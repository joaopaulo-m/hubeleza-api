import { CreateAffiliateUseCase } from "../../../application/use-cases/affiliate/create"
import { CreateAffiliateController } from "../../../infrastructure/controllers/affiliate/create"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"
import { PrismaAffiliateWalletRepository } from "../../../infrastructure/repos/prisma/affiliate-wallet"

export const makeCreateAffiliateController = () => {
  const affiliateRepo = new PrismaAffiliateRepository()
  const affiliateWalletRepo = new PrismaAffiliateWalletRepository()
  const useCase = new CreateAffiliateUseCase(affiliateRepo, affiliateWalletRepo)
  return new CreateAffiliateController(useCase)
}