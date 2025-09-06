import { ConfirmPartnerAccountUseCase } from "../../../application/use-cases/partner/confirm-account"
import { ConfirmWalletPaymentUseCase } from "../../../application/use-cases/wallet/confirm-payment"
import { ConfirmWalletPaymentController } from "../../../infrastructure/controllers/wallet/confirm-payment"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"
import { EvolutionMessagingService } from "../../../infrastructure/services/evolution-api"
import { PuppeteerContractService } from "../../../infrastructure/services/puppeteer"

export const makeConfirmWalletPaymentController = () => {
  const transactionRepo = new PrismaTransactionRepository()
  const walletRepo = new PrismaWalletRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const contractService = new PuppeteerContractService()
  const messagingService = new EvolutionMessagingService(
    process.env.EVOLUTION_API_BASE_URL || "https://api.evolution.com",
    process.env.EVOLUTION_INSTANCE || "default-instance",
    process.env.EVOLUTION_TOKEN || ""
  )
  const confirmPartnerAccountUseCase = new ConfirmPartnerAccountUseCase(
    partnerRepo,
    contractService,
    messagingService
  )
  const useCase = new ConfirmWalletPaymentUseCase(
    transactionRepo,
    walletRepo,
    confirmPartnerAccountUseCase
  )
  return new ConfirmWalletPaymentController(useCase)
}