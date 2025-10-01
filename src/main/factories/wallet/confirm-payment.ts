import { AddOperatorComissionUseCase } from "../../../application/use-cases/operator/add-comission"
import { ConfirmPartnerAccountUseCase } from "../../../application/use-cases/partner/confirm-account"
import { ConfirmWalletPaymentUseCase } from "../../../application/use-cases/wallet/confirm-payment"
import { ConfirmWalletPaymentController } from "../../../infrastructure/controllers/wallet/confirm-payment"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"
import { PrismaAffiliateTransactionRepository } from "../../../infrastructure/repos/prisma/affiliate-transaction"
import { PrismaAffiliateWalletRepository } from "../../../infrastructure/repos/prisma/affiliate-wallet"
import { PrismaInviteTokenRepository } from "../../../infrastructure/repos/prisma/invite-token"
import { PrismaOperatorRepository } from "../../../infrastructure/repos/prisma/operator"
import { PrismaOperatorTransactionRepository } from "../../../infrastructure/repos/prisma/operator-transaction"
import { PrismaOperatorWalletRepository } from "../../../infrastructure/repos/prisma/operator-wallet"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"
import { EvolutionMessagingService } from "../../../infrastructure/services/evolution-api"
import { PuppeteerContractService } from "../../../infrastructure/services/puppeteer"
import { makeAddAffiliateComissionUseCase } from "../affiliate/add-comission"

export const makeConfirmWalletPaymentController = () => {
  const transactionRepo = new PrismaTransactionRepository()
  const walletRepo = new PrismaWalletRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const inviteTokenRepo = new PrismaInviteTokenRepository()
  const operatorRepo = new PrismaOperatorRepository()
  const operatorWalletRepo = new PrismaOperatorWalletRepository()
  const operatorTransactionRepo = new PrismaOperatorTransactionRepository()
  const affiliateRepo = new PrismaAffiliateRepository()
  const affiliateWalletRepo = new PrismaAffiliateWalletRepository()
  const affiliateTransactionRepo = new PrismaAffiliateTransactionRepository()
  const contractService = new PuppeteerContractService()
  const messagingService = new EvolutionMessagingService(
    process.env.EVOLUTION_API_BASE_URL || "https://api.evolution.com",
    process.env.EVOLUTION_INSTANCE || "default-instance",
    process.env.EVOLUTION_TOKEN || ""
  )
  const addOperatorComissionUseCase = new AddOperatorComissionUseCase(
    operatorRepo,
    transactionRepo,
    operatorWalletRepo,
    operatorTransactionRepo
  )
  const addAffiliateComissionUseCase = makeAddAffiliateComissionUseCase()
  const confirmPartnerAccountUseCase = new ConfirmPartnerAccountUseCase(
    partnerRepo,
    inviteTokenRepo,
    contractService,
    messagingService,
    addOperatorComissionUseCase,
    addAffiliateComissionUseCase
  )
  const useCase = new ConfirmWalletPaymentUseCase(
    transactionRepo,
    walletRepo,
    confirmPartnerAccountUseCase,
    addOperatorComissionUseCase
  )
  return new ConfirmWalletPaymentController(useCase)
}