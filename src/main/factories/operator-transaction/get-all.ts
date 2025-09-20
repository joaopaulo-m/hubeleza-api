import { GetOperatorTransactionsUseCase } from "../../../application/use-cases/operator-transaction/get-all"
import { GetOperatorTransactionsController } from "../../../infrastructure/controllers/operator-transaction/get-all"
import { PrismaOperatorTransactionRepository } from "../../../infrastructure/repos/prisma/operator-transaction"

export const makeGetOperatorTransactionsController = () => {
  const operatorTransactionRepo =new PrismaOperatorTransactionRepository()
  const useCase = new GetOperatorTransactionsUseCase(operatorTransactionRepo)
  return new GetOperatorTransactionsController(useCase)
}