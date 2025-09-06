import { DeleteTreatmentStatePriceUseCase } from "../../../application/use-cases/treatment-state-price/delete"
import { DeleteTreatmentStatePriceController } from "../../../infrastructure/controllers/treatment-state-price/delete"
import { PrismaTreatmentStatePriceRepository } from "../../../infrastructure/repos/prisma/treatment-state-price"

export const makeDeleteTreatmentStatePriceController = () => {
  const treatmentStatePriceRepo = new PrismaTreatmentStatePriceRepository()
  const useCase = new DeleteTreatmentStatePriceUseCase(treatmentStatePriceRepo)
  return new DeleteTreatmentStatePriceController(useCase)
}