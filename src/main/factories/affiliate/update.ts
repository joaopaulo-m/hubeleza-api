import { UpdateAffiliateUseCase } from "../../../application/use-cases/affiliate/update"
import { UpdateAffiliateController } from "../../../infrastructure/controllers/affiliate/update"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"

export const makeUpdateAffiliateController = () => {
  const affiliateRepo = new PrismaAffiliateRepository()
  const useCase = new UpdateAffiliateUseCase(affiliateRepo)
  return new UpdateAffiliateController(useCase)
}