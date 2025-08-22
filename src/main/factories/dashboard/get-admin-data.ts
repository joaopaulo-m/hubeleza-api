import { GetAdminDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-admin-data"
import { GetAdminDashboardDataController } from "../../../infrastructure/controllers/dashboard/get-admin-data"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"
import { AsaasPaymentService } from "../../../infrastructure/services/asaas"

export const makeGetAdminDashboardDataController = () => {
  const walletRepo = new PrismaWalletRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const leadRepo = new PrismaLeadRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const transactionRepo = new PrismaTransactionRepository()
  const paymentService = new AsaasPaymentService(process.env.ASAAS_ACCESS_TOKEN || "")
  const useCase = new GetAdminDashboardDataUseCase(walletRepo, partnerRepo, leadRepo, treatmentRepo, transactionRepo, paymentService)
  return new GetAdminDashboardDataController(useCase)
}