import { DefinePasswordUseCase } from "../../../application/use-cases/auth/define-password"
import { DefinePasswordController } from "../../../infrastructure/controllers/auth/define-password"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeDefinePasswordController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const adminRepo = new PrismaAdminRepository()
  const operatorRepo = new PrismaOperatorRepository()
  const useCase = new DefinePasswordUseCase(partnerRepo, adminRepo, operatorRepo)
  return new DefinePasswordController(useCase)
}