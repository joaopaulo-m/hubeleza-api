import { DefinePasswordUseCase } from "../../../application/use-cases/auth/define-password"
import { DefinePasswordController } from "../../../infrastructure/controllers/auth/define-password"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeDefinePasswordController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const adminRepo = new PrismaAdminRepository()
  const operatorRepo = new PrismaOperatorRepository()
  const affiliateRepo = new PrismaAffiliateRepository()
  const useCase = new DefinePasswordUseCase(partnerRepo, adminRepo, operatorRepo, affiliateRepo)
  return new DefinePasswordController(useCase)
}