import { GetDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-data"
import { GetDashboardDataController } from "../../../infrastructure/controllers/dashboard/get-data"
import { PrismaFormRepository } from "../../../infrastructure/repos/prisma/form"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"

export const makeGetDashboardDataController = () => {
  const leadRepo = new PrismaLeadRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const formRepo = new PrismaFormRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new GetDashboardDataUseCase(
    leadRepo,
    partnerRepo,
    formRepo,
    treatmentRepo
  )
  return new GetDashboardDataController(useCase)
}