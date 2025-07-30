import { UpdateLeadUseCase } from "../../../application/use-cases/lead/update"
import { UpdateLeadController } from "../../../infrastructure/controllers/lead/update"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"
import { OpenCageGeolocationService } from "../../../infrastructure/services/open-cage"

export const makeUpdateLeadController = () => {
  const leadRepo = new PrismaLeadRepository()
  const geolocationService = new OpenCageGeolocationService()
  const useCase = new UpdateLeadUseCase(leadRepo, geolocationService)
  return new UpdateLeadController(useCase)
}