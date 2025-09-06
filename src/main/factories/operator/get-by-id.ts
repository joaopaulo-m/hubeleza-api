import { GetOperatorByIdUseCase } from "../../../application/use-cases/operator/get-by-id"
import { GetOperatorByIdController } from "../../../infrastructure/controllers/operator/get-by-id"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"

export const makeGetOperatorByIdController = () => {
  const operatorRepo = new PrismaOperatorRepository()
  const useCase = new GetOperatorByIdUseCase(operatorRepo)
  return new GetOperatorByIdController(useCase)
}