import { CreateWalletPaymentUseCase } from "../../../application/use-cases/wallet/create-payment"
import { CreateWalletPaymentController } from "../../../infrastructure/controllers/wallet/create-payment"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"
import { AsaasPaymentService } from "../../../infrastructure/services/asaas"

export const makeCreateWalletPaymentController = () => {
  const walletRepo = new PrismaWalletRepository()
  const transactionRepo = new PrismaTransactionRepository()
  const paymentService = new AsaasPaymentService(
    process.env.ASAAS_ACCESS_TOKEN || ""
  )
  const useCase = new CreateWalletPaymentUseCase(
    walletRepo,
    transactionRepo,
    paymentService
  )
  return new CreateWalletPaymentController(useCase)
}