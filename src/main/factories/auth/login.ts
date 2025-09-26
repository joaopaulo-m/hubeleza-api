import { LoginUseCase } from "../../../application/use-cases/auth/login"
import { LoginController } from "../../../infrastructure/controllers/auth/login"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { JsonWebTokenService } from "../../../infrastructure/services/jwt"

export const makeLoginController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const adminRepo = new PrismaAdminRepository()
  const operatorRepo = new PrismaOperatorRepository()
  const affiliateRepo = new PrismaAffiliateRepository()
  const jwtService = new JsonWebTokenService()
  const useCase = new LoginUseCase(
    partnerRepo,
    adminRepo,
    operatorRepo,
    affiliateRepo,
    jwtService
  )
  return new LoginController(useCase)
}