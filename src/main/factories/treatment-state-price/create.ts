import { CreateTreatmentStatePriceUseCase } from "../../../application/use-cases/treatment-state-price/create"
import { CreateTreatmentStatePriceController } from "../../../infrastructure/controllers/treatment-state-price/create"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { PrismaTreatmentStatePriceRepository } from "../../../infrastructure/repos/prisma/treatment-state-price"

export const makeCreateTreatmentStatePriceController = () => {
  const treatmentRepo = new PrismaTreatmentRepository()
  const treatmentStatePriceRepo = new PrismaTreatmentStatePriceRepository()
  const useCase = new CreateTreatmentStatePriceUseCase(treatmentRepo, treatmentStatePriceRepo)
  return new CreateTreatmentStatePriceController(useCase)
}