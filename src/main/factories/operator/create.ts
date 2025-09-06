import { CreateOperatorUseCase } from "../../../application/use-cases/operator/create"
import { CreateOperatorController } from "../../../infrastructure/controllers/operator/create"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"

export const makeCreateOperatorController = () => {
  const adminRepo = new PrismaAdminRepository()
  const operatorRepo = new PrismaOperatorRepository()
  const useCase = new CreateOperatorUseCase(
    adminRepo,
    operatorRepo
  )
  return new CreateOperatorController(useCase)
}