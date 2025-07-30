import { GetAllFormsUseCase } from "../../../application/use-cases/form/get-all"
import { GetAllFormsController } from "../../../infrastructure/controllers/form/get-all"
import { PrismaFormRepository } from "../../../infrastructure/repos/prisma/form"

export const makeGetAllFormsController = () => {
  const formRepo = new PrismaFormRepository()
  const useCase = new GetAllFormsUseCase(formRepo)
  return new GetAllFormsController(useCase)
}