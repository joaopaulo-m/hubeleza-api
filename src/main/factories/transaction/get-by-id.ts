import { GetTransactionByIdUseCase } from "../../../application/use-cases/transaction/get-by-id"
import { GetTransactionByIdController } from "../../../infrastructure/controllers/transaction/get-by-id"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"

export const makeGetTransactionByIdController = () => {
  const transactionRepo = new PrismaTransactionRepository()
  const useCase = new GetTransactionByIdUseCase(transactionRepo)
  return new GetTransactionByIdController(useCase)
}