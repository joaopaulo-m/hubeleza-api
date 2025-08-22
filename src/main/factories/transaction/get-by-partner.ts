import { GetPartnerTransactionsUseCase } from "../../../application/use-cases/transaction/get-by-partner"
import { GetPartnerTransactionsController } from "../../../infrastructure/controllers/transaction/get-by-partner"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"

export const makeGetPartnerTransactionsController = () => {
  const transactionRepo = new PrismaTransactionRepository()
  const useCase = new GetPartnerTransactionsUseCase(transactionRepo)
  return new GetPartnerTransactionsController(useCase)
}