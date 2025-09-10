import { CreateOperatorUseCase } from "../../../application/use-cases/operator/create"
import { CreateOperatorController } from "../../../infrastructure/controllers/operator/create"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"
import { NodemailerService } from "../../../infrastructure/services/nodemailer"

export const makeCreateOperatorController = () => {
  const adminRepo = new PrismaAdminRepository()
  const operatorRepo = new PrismaOperatorRepository()
  const emailService = new NodemailerService()
  const useCase = new CreateOperatorUseCase(
    adminRepo,
    operatorRepo,
    emailService,
  )
  return new CreateOperatorController(useCase)
}