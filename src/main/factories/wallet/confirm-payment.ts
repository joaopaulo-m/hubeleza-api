import { ConfirmWalletPaymentUseCase } from "../../../application/use-cases/wallet/confirm-payment"
import { ConfirmWalletPaymentController } from "../../../infrastructure/controllers/wallet/confirm-payment"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"

export const makeConfirmWalletPaymentController = () => {
  const transactionRepo = new PrismaTransactionRepository()
  const walletRepo = new PrismaWalletRepository()
  const useCase = new ConfirmWalletPaymentUseCase(
    transactionRepo,
    walletRepo
  )
  return new ConfirmWalletPaymentController(useCase)
}