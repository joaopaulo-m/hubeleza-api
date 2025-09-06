import { DeleteOperatorUseCase } from "../../../application/use-cases/operator/delete"
import { DeleteOperatorController } from "../../../infrastructure/controllers/operator/delete"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"

export const makeDeleteOperatorController = () => {
  const operatorRepo = new PrismaOperatorRepository()
  const useCase = new DeleteOperatorUseCase(operatorRepo)
  return new DeleteOperatorController(useCase)
}