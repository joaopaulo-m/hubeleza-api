import { UpdateTreatmentStatePriceUseCase } from "../../../application/use-cases/treatment-state-price/update"
import { UpdateTreatmentStatePriceController } from "../../../infrastructure/controllers/treatment-state-price/update"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { PrismaTreatmentStatePriceRepository } from "../../../infrastructure/repos/prisma/treatment-state-price"

export const makeUpdateTreatmentStatePriceController = () => {
  const treatmentStatePriceRepo = new PrismaTreatmentStatePriceRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new UpdateTreatmentStatePriceUseCase(treatmentStatePriceRepo, treatmentRepo)
  return new UpdateTreatmentStatePriceController(useCase)
}