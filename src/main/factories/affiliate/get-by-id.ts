import { GetAffiliateByIdUseCase } from "../../../application/use-cases/affiliate/get-by-id"
import { GetAffiliateByIdController } from "../../../infrastructure/controllers/affiliate/get-by-id"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"

export const makeGetAffiliateByIdController = () => {
  const affiliateRepo = new PrismaAffiliateRepository()
  const useCase = new GetAffiliateByIdUseCase(affiliateRepo)
  return new GetAffiliateByIdController(useCase)
}