import { GetPartnerByIdUseCase } from "../../../application/use-cases/partner/get-by-id"
import { GetPartnerByIdController } from "../../../infrastructure/controllers/partner/get-by-id"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeGetPartnerByIdController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const useCase = new GetPartnerByIdUseCase(partnerRepo)
  return new GetPartnerByIdController(useCase)
}