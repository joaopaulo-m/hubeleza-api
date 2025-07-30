import { CreatePartnerUseCase } from "../../../application/use-cases/partner/create"
import { CreatePartnerController } from "../../../infrastructure/controllers/partner/create"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { OpenCageGeolocationService } from "../../../infrastructure/services/open-cage"

export const makeCreatePartnerController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const geolocationService = new OpenCageGeolocationService()
  const useCase = new CreatePartnerUseCase(
    partnerRepo, 
    treatmentRepo, 
    geolocationService
  )
  return new CreatePartnerController(useCase)
}