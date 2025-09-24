import { GetAffiliateTransactionsUseCase } from "../../../application/use-cases/affiliate-transaction/get-all"
import { GetAffiliateTransactionsController } from "../../../infrastructure/controllers/affiliate-transaction/get-all"
import { PrismaAffiliateTransactionRepository } from "../../../infrastructure/repos/prisma/affiliate-transaction"

export const makeGetAffiliateTransactionsController = () => {
  const affiliateTransactionRepo = new PrismaAffiliateTransactionRepository()
  const useCase = new GetAffiliateTransactionsUseCase(affiliateTransactionRepo)
  return new GetAffiliateTransactionsController(useCase)
}