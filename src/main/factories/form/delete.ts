import { DeleteFormUseCase } from "../../../application/use-cases/form/delete"
import { DeleteFormController } from "../../../infrastructure/controllers/form/delete"
import { PrismaFormRepository } from "../../../infrastructure/repos/prisma/form"

export const makeDeleteFormController =() => {
  const formRepo = new PrismaFormRepository()
  const useCase = new DeleteFormUseCase(formRepo)
  return new DeleteFormController(useCase)
}