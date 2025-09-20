import { ExportTransactionsUseCase } from "../../../application/use-cases/transaction/export"
import { ExportTransactionsController } from "../../../infrastructure/controllers/transaction/export"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"

export const makeExportTransactionsController = () => {
  const transactionRepo = new PrismaTransactionRepository()
  const useCase = new ExportTransactionsUseCase(transactionRepo)
  return new ExportTransactionsController(useCase)
}