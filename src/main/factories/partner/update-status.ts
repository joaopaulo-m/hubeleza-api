import { UpdatePartnerStatusUseCase } from "../../../application/use-cases/partner/update-status"
import { UpdatePartnerStatusController } from "../../../infrastructure/controllers/partner/update-status"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeUpdatePartnerStatusController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const useCase = new UpdatePartnerStatusUseCase(partnerRepo)
  return new UpdatePartnerStatusController(useCase)
}