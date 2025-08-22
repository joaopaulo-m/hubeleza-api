import { SignPartnerUpUseCase } from "../../../application/use-cases/partner/sign-up"
import { SignPartnerUpController } from "../../../infrastructure/controllers/partner/sign-up"
import { PrismaInviteTokenRepository } from "../../../infrastructure/repos/prisma/invite-token"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"
import { AsaasPaymentService } from "../../../infrastructure/services/asaas"
import { OpenCageGeolocationService } from "../../../infrastructure/services/open-cage"

export const makeSignPartnerUpController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const inviteTokenRepo = new PrismaInviteTokenRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const walletRepo = new PrismaWalletRepository()
  const geolocationService = new OpenCageGeolocationService()
  const paymentService = new AsaasPaymentService(
    process.env.ASAAS_ACCESS_TOKEN || ""
  )
  const useCase = new SignPartnerUpUseCase(
    partnerRepo,
    inviteTokenRepo,
    treatmentRepo,
    walletRepo,
    geolocationService,
    paymentService
  )
  return new SignPartnerUpController(useCase)
}