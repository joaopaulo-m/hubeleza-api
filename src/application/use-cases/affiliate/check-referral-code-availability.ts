import type { IAffiliateRepository } from "../../contracts/repos/affiliate";

export class CheckAffiliateReferralCodeAvailabilityUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository
  ){}

  async execute(referral_code: string): Promise<{ available: boolean }> {
    const affiliateExists = await this.affiliateRepo.findByReferralCode(referral_code)

    if (affiliateExists) {
      return {
        available: false
      }
    }

    return {
      available: true
    }
  }
}