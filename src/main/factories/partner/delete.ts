import { DeletePartnerUseCase } from "../../../application/use-cases/partner/delete"
import { DeletePartnerController } from "../../../infrastructure/controllers/partner/delete"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"

export const makeDeletePartnerController = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const useCase = new DeletePartnerUseCase(partnerRepo)
  return new DeletePartnerController(useCase)
}