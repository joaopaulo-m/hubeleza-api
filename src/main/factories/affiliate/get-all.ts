import { GetAffiliatesUseCase } from "../../../application/use-cases/affiliate/get-all"
import { GetAffiliatesController } from "../../../infrastructure/controllers/affiliate/get-all"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"

export const makeGetAffiliatesController = () => {
  const affiliateRepo = new PrismaAffiliateRepository()
  const useCase = new GetAffiliatesUseCase(affiliateRepo)
  return new GetAffiliatesController(useCase)
}