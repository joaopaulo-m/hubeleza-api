import { GetTransactionsUseCase } from "../../../application/use-cases/transaction/get-all"
import { GetTransactionsController } from "../../../infrastructure/controllers/transaction/get-all"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"

export const makeGetTransactionsController = () => {
  const transactionRepo = new PrismaTransactionRepository()
  const useCase = new GetTransactionsUseCase(transactionRepo)
  return new GetTransactionsController(useCase)
}