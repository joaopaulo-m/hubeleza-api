import { DeleteTreatmentUseCase } from "../../../application/use-cases/treatment/delete"
import { DeleteTreatmentController } from "../../../infrastructure/controllers/treatment/delete"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"

export const makeDeleteTreatmentController = () => {
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new DeleteTreatmentUseCase(treatmentRepo)
  return new DeleteTreatmentController(useCase)
}