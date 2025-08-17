import { LoginUseCase } from "../../../application/use-cases/auth/login"
import { LoginController } from "../../../infrastructure/controllers/auth/login"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { JsonWebTokenService } from "../../../infrastructure/services/jwt"

export const makeLoginController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const adminRepo = new PrismaAdminRepository()
  const jwtService = new JsonWebTokenService()
  const useCase = new LoginUseCase(
    partnerRepo,
    adminRepo,
    jwtService
  )
  return new LoginController(useCase)
}