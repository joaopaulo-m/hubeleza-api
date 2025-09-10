import { CreatePartnerUseCase } from "../../../application/use-cases/partner/create"
import { CreatePartnerController } from "../../../infrastructure/controllers/partner/create"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"
import { AsaasPaymentService } from "../../../infrastructure/services/asaas"
import { OpenCageGeolocationService } from "../../../infrastructure/services/open-cage"

export const makeCreatePartnerController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const walletRepo = new PrismaWalletRepository()
  const geolocationService = new OpenCageGeolocationService()
  const paymentService = new AsaasPaymentService(
    process.env.ASAAS_BASE_URL || "",
    process.env.ASAAS_ACCESS_TOKEN || ""
  )
  const useCase = new CreatePartnerUseCase(
    partnerRepo, 
    treatmentRepo,
    walletRepo,
    geolocationService,
    paymentService
  )
  return new CreatePartnerController(useCase)
}