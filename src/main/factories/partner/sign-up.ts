import { SignPartnerUpUseCase } from "../../../application/use-cases/partner/sign-up"
import { SignPartnerUpController } from "../../../infrastructure/controllers/partner/sign-up"
import { PrismaInviteTokenRepository } from "../../../infrastructure/repos/prisma/invite-token"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { OpenCageGeolocationService } from "../../../infrastructure/services/open-cage"

export const makeSignPartnerUpController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const inviteTokenRepo = new PrismaInviteTokenRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const geolocationService = new OpenCageGeolocationService()
  const useCase = new SignPartnerUpUseCase(
    partnerRepo,
    inviteTokenRepo,
    treatmentRepo,
    geolocationService
  )
  return new SignPartnerUpController(useCase)
}