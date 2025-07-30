import { GetAllTreatmentsUseCase } from "../../../application/use-cases/treatment/get-all"
import { GetAllTreatmentsController } from "../../../infrastructure/controllers/treatment/get-all"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"

export const makeGetAllTreatmentsController = () => {
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new GetAllTreatmentsUseCase(treatmentRepo)
  return new GetAllTreatmentsController(useCase)
}