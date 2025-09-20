import { GetOperatorDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-operator-data"
import { GetOperatorDashboardDataController } from "../../../infrastructure/controllers/dashboard/get-operator-data"
import { PrismaOperatorTransactionRepository } from "../../../infrastructure/repos/prisma/operator-transaction"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeGetOperatorDashboardDataController = () => {
  const operatorTransactionRepo = new PrismaOperatorTransactionRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const useCase = new GetOperatorDashboardDataUseCase(
    operatorTransactionRepo,
    partnerRepo
  )
  return new GetOperatorDashboardDataController(useCase)
}