import { GetPartnerLeadsUseCase } from "../../../application/use-cases/lead/get-by-partner"
import { GetPartnerLeadsController } from "../../../infrastructure/controllers/lead/get-by-partner"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeGetPartnerLeadsController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const leadRepo = new PrismaLeadRepository()
  const useCase = new GetPartnerLeadsUseCase(partnerRepo, leadRepo)
  return new GetPartnerLeadsController(useCase)
}