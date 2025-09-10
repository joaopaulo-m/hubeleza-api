import { SignPartnerUpUseCase } from "../../../application/use-cases/partner/sign-up"
import { CreateWalletPaymentUseCase } from "../../../application/use-cases/wallet/create-payment"
import { SignPartnerUpController } from "../../../infrastructure/controllers/partner/sign-up"
import { PrismaInviteTokenRepository } from "../../../infrastructure/repos/prisma/invite-token"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"
import { AsaasPaymentService } from "../../../infrastructure/services/asaas"
import { OpenCageGeolocationService } from "../../../infrastructure/services/open-cage"

export const makeSignPartnerUpController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const inviteTokenRepo = new PrismaInviteTokenRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const walletRepo = new PrismaWalletRepository()
  const transactionRepo = new PrismaTransactionRepository()
  const geolocationService = new OpenCageGeolocationService()
  const paymentService = new AsaasPaymentService(
    process.env.ASAAS_BASE_URL || "",
    process.env.ASAAS_ACCESS_TOKEN || ""
  )
  const createWalletPaymentUseCase = new CreateWalletPaymentUseCase(
    walletRepo,
    transactionRepo,
    paymentService
  )
  const useCase = new SignPartnerUpUseCase(
    partnerRepo,
    inviteTokenRepo,
    treatmentRepo,
    walletRepo,
    geolocationService,
    paymentService,
    createWalletPaymentUseCase
  )
  return new SignPartnerUpController(useCase)
}