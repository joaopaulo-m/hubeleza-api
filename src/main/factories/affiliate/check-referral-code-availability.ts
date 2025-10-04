import { CheckAffiliateReferralCodeAvailabilityUseCase } from "../../../application/use-cases/affiliate/check-referral-code-availability"
import { CheckAffiliateReferralCodeAvailabilityController } from "../../../infrastructure/controllers/affiliate/check-referral-code-availability"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"

export const makeCheckAffiliateReferralCodeAvailabilityController = () => {
  const affiliateRepo = new PrismaAffiliateRepository()
  const useCase = new CheckAffiliateReferralCodeAvailabilityUseCase(affiliateRepo)
  return new CheckAffiliateReferralCodeAvailabilityController(useCase)
}