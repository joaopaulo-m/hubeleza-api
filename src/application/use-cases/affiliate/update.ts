import type { IAffiliateRepository } from "../../contracts/repos/affiliate";

export interface UpdateAffiliateDto {
  affiliate_id: string
  name?: string
  comission_percentage?: number
  lead_comission_amount?: number
  referral_code?: string
}

export class UpdateAffiliateUseCase {
  constructor(
  private readonly affiliateRepo: IAffiliateRepository
  ){}

  async execute(props: UpdateAffiliateDto): Promise<Error | void> {
    const affiliate = await this.affiliateRepo.findById(props.affiliate_id)

    if (!affiliate) {
      return new Error("Affiliate not found")
    }

    if (props.name) {
      affiliate.updateName(props.name)
    }

    if (props.comission_percentage) {
      affiliate.updateComissionPercentage(props.comission_percentage)
    }

    if (props.lead_comission_amount) {
      affiliate.updateLeadComissionAmount(props.lead_comission_amount)
    }

    if (props.referral_code) {
      affiliate.updateReferralCode(props.referral_code)
    }

    await this.affiliateRepo.update(affiliate)
    return void 0
  }
}