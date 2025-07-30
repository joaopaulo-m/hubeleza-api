import { UpdateFormUseCase } from "../../../application/use-cases/form/update"
import { UpdateFormController } from "../../../infrastructure/controllers/form/update"
import { PrismaFormRepository } from "../../../infrastructure/repos/prisma/form"

export const makeUpdateFormController = () => {
  const formRepo = new PrismaFormRepository()
  const useCase = new UpdateFormUseCase(formRepo)
  return new UpdateFormController(useCase)
}