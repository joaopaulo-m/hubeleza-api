import { WithdrawAffiliateWalletUseCase } from "../../../application/use-cases/affiliate-wallet/withdraw"
import { WithdrawAffiliateWalletController } from "../../../infrastructure/controllers/affiliate-wallet/withdraw"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"
import { PrismaAffiliateTransactionRepository } from "../../../infrastructure/repos/prisma/affiliate-transaction"
import { PrismaAffiliateWalletRepository } from "../../../infrastructure/repos/prisma/affiliate-wallet"
import { AsaasPaymentService } from "../../../infrastructure/services/asaas"

export const makeWithdrawAffiliateWalletController = () => {
  const affiliateRepo = new PrismaAffiliateRepository()
  const affiliateWalletRepo = new PrismaAffiliateWalletRepository()
  const affiliateTransactionRepo = new PrismaAffiliateTransactionRepository()
  const paymentService = new AsaasPaymentService(
    process.env.ASAAS_BASE_URL || "",
    process.env.ASAAS_ACCESS_TOKEN || ""
  )
  const useCase = new WithdrawAffiliateWalletUseCase(
    affiliateRepo,
    affiliateWalletRepo,
    affiliateTransactionRepo,
    paymentService
  )
  return new WithdrawAffiliateWalletController(useCase)
}