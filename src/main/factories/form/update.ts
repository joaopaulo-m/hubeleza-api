import { UpdateFormUseCase } from "../../../application/use-cases/form/update"
import { UpdateFormController } from "../../../infrastructure/controllers/form/update"
import { PrismaFormRepository } from "../../../infrastructure/repos/prisma/form"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"

export const makeUpdateFormController = () => {
  const formRepo = new PrismaFormRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new UpdateFormUseCase(formRepo, treatmentRepo)
  return new UpdateFormController(useCase)
}