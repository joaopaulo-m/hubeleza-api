import { GetAllOperatorsUseCase } from "../../../application/use-cases/operator/get-all"
import { GetAllOperatorsController } from "../../../infrastructure/controllers/operator/get-all"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"

export const makeGetAllOperatorsController = () => {
  const operatorRepo = new PrismaOperatorRepository()
  const useCase = new GetAllOperatorsUseCase(operatorRepo)
  return new GetAllOperatorsController(useCase)
}