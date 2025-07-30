import { CreateFormUseCase } from "../../../application/use-cases/form/create"
import { CreateFormController } from "../../../infrastructure/controllers/form/create"
import { PrismaFormRepository } from "../../../infrastructure/repos/prisma/form"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"

export const makeCreateFormController = () => {
  const formRepo = new PrismaFormRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new CreateFormUseCase(formRepo, treatmentRepo)
  return new CreateFormController(useCase)
}