import { GetAllPartnersUseCase } from "../../../application/use-cases/partner/get-all"
import { GetAllPartnersController } from "../../../infrastructure/controllers/partner/get-all"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeGetAllPartnersController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const useCase = new GetAllPartnersUseCase(partnerRepo)
  return new GetAllPartnersController(useCase)
}