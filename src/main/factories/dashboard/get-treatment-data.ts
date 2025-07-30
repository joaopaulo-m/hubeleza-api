import { GetTreatmentDataUseCase } from "../../../application/use-cases/dashboard/get-treatment-data"
import { GetTreatmentDataController } from "../../../infrastructure/controllers/dashboard/get-treatment-data"
import { PrismaFormRepository } from "../../../infrastructure/repos/prisma/form"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"

export const makeGetTreatmentDataController = () => {
  const leadRepo = new PrismaLeadRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const formRepo = new PrismaFormRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const useCase = new GetTreatmentDataUseCase(
    formRepo,
    partnerRepo,
    leadRepo,
  )
  return new GetTreatmentDataController(useCase)
}