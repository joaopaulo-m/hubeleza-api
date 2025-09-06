import { ExportPartnersUseCase } from "../../../application/use-cases/partner/export"
import { ExportPartnersController } from "../../../infrastructure/controllers/partner/export"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeExportPartnersController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const useCase = new ExportPartnersUseCase(partnerRepo)
  return new ExportPartnersController(useCase)
}