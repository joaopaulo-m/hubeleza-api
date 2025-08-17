import { DefinePasswordUseCase } from "../../../application/use-cases/auth/define-password"
import { DefinePasswordController } from "../../../infrastructure/controllers/auth/define-password"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeDefinePasswordController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const adminRepo = new PrismaAdminRepository()
  const useCase = new DefinePasswordUseCase(partnerRepo, adminRepo)
  return new DefinePasswordController(useCase)
}