import { CreateTreatmentUseCase } from "../../../application/use-cases/treatment/create"
import { CreateTreatmentController } from "../../../infrastructure/controllers/treatment/create"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"

export const makeCreateTreatmentController = () => {
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new CreateTreatmentUseCase(treatmentRepo)
  return new CreateTreatmentController(useCase)
}