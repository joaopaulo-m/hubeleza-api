import { GetAffiliateDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-affiliate-data"
import { GetAffiliateDashboardDataController } from "../../../infrastructure/controllers/dashboard/get-affiliate-data"
import { PrismaAffiliateTransactionRepository } from "../../../infrastructure/repos/prisma/affiliate-transaction"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeGetAffiliateDashboardDataController = () => {
  const affiliateTransactionRepo = new PrismaAffiliateTransactionRepository()
  const leadRepo = new PrismaLeadRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const useCase = new GetAffiliateDashboardDataUseCase(
    affiliateTransactionRepo,
    leadRepo,
    partnerRepo
  )
  return new GetAffiliateDashboardDataController(useCase)
}