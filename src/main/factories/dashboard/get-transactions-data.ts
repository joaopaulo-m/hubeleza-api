import { GetTransactionsDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-transactions-data"
import { GetTransactionsDashboardDataController } from "../../../infrastructure/controllers/dashboard/get-transactions-data"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"

export const makeGetTransactionsDashboardDataController = () => {
  const transactionRepo = new PrismaTransactionRepository()
  const useCase = new GetTransactionsDashboardDataUseCase(transactionRepo)
  return new GetTransactionsDashboardDataController(useCase)
}