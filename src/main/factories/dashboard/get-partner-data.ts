import { GetPartnerDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-partner-data"
import { GetPartnerDashboardDataController } from "../../../infrastructure/controllers/dashboard/get-partner-data"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"

export const makeGetPartnerDashboardDataController = () => {
  const leadRepo = new PrismaLeadRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new GetPartnerDashboardDataUseCase(leadRepo, treatmentRepo)
  return new GetPartnerDashboardDataController(useCase)
}