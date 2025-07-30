import { UpdatePartnerUseCase } from "../../../application/use-cases/partner/update"
import { UpdatePartnerController } from "../../../infrastructure/controllers/partner/update"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { OpenCageGeolocationService } from "../../../infrastructure/services/open-cage"

export const makeUpdatePartnerController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const geolocationService = new OpenCageGeolocationService()
  const useCase = new UpdatePartnerUseCase(
    partnerRepo, 
    treatmentRepo, 
    geolocationService
  )
  return new UpdatePartnerController(useCase)
}