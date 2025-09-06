import { UpdateOperatorUseCase } from "../../../application/use-cases/operator/update"
import { UpdateOperatorController } from "../../../infrastructure/controllers/operator/update"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"

export const makeUpdateOperatorController = () => {
  const operatorRepo = new PrismaOperatorRepository()
  const useCase = new UpdateOperatorUseCase(operatorRepo)
  return new UpdateOperatorController(useCase)
}