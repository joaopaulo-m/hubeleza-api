import { DeleteAffiliateUseCase } from "../../../application/use-cases/affiliate/delete"
import { DeleteAffiliateController } from "../../../infrastructure/controllers/affiliate/delete"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"

export const makeDeleteAffiliateController = () => {
  const affiliateRepo = new PrismaAffiliateRepository()
  const useCase = new DeleteAffiliateUseCase(affiliateRepo)
  return new DeleteAffiliateController(useCase)
}