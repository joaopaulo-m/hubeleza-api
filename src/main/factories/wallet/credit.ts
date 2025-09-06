import { CreditWalletUseCase } from "../../../application/use-cases/wallet/credit"
import { CreditWalletController } from "../../../infrastructure/controllers/wallet/credit"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"

export const makeCreditWalletController = () => {
  const walletRepo = new PrismaWalletRepository()
  const transactionRepo = new PrismaTransactionRepository()
  const useCase = new CreditWalletUseCase(walletRepo, transactionRepo)
  return new CreditWalletController(useCase)
}