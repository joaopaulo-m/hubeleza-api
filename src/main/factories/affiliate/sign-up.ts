import { SignAffiliateUpUseCase } from "../../../application/use-cases/affiliate/sign-up"
import { SignAffiliateUpController } from "../../../infrastructure/controllers/affiliate/sign-up"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"
import { PrismaAffiliateWalletRepository } from "../../../infrastructure/repos/prisma/affiliate-wallet"

export const makeSignAffiliateUpController = () => {
  const affiliateRepo = new PrismaAffiliateRepository()
  const affiliateWalletRepo = new PrismaAffiliateWalletRepository()
  const useCase = new SignAffiliateUpUseCase(
    affiliateRepo,
    affiliateWalletRepo
  )
  return new SignAffiliateUpController(useCase)
}