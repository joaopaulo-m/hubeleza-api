import { UpdateTreatmentUseCase } from "../../../application/use-cases/treatment/update"
import { UpdateTreatmentController } from "../../../infrastructure/controllers/treatment/update"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"

export const makeUpdateTreatmentController = () => {
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new UpdateTreatmentUseCase(treatmentRepo)
  return new UpdateTreatmentController(useCase)
}