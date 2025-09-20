import { CreateWalletPaymentUseCase } from "../../../application/use-cases/wallet/create-payment"
import { CreateWalletPaymentController } from "../../../infrastructure/controllers/wallet/create-payment"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"
import { AsaasPaymentService } from "../../../infrastructure/services/asaas"
import { BullMQQueueService } from "../../../infrastructure/services/queue/bullmq"

export const makeCreateWalletPaymentController = () => {
  const walletRepo = new PrismaWalletRepository()
  const transactionRepo = new PrismaTransactionRepository()
  const paymentService = new AsaasPaymentService(
    process.env.ASAAS_BASE_URL || "",
    process.env.ASAAS_ACCESS_TOKEN || ""
  )
  const queueService = new BullMQQueueService("account-confirmation")
  const useCase = new CreateWalletPaymentUseCase(
    walletRepo,
    transactionRepo,
    paymentService,
    queueService
  )
  return new CreateWalletPaymentController(useCase)
}