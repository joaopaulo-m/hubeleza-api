import { CreateLeadUseCase } from "../../../application/use-cases/lead/create"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { OpenCageGeolocationService } from "../../../infrastructure/services/open-cage"

export const makeCreateLeadUseCase = () => {
  const leadRepo = new PrismaLeadRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const geolocationService = new OpenCageGeolocationService()
  return new CreateLeadUseCase(leadRepo, treatmentRepo, geolocationService)
}