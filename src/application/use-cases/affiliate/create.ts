import { Affiliate } from "../../../domain/entities/affiliate";
import type { IAffiliateRepository } from "../../contracts/repos/affiliate";

export interface CreateAffiliateDto {
  name: string
  email: string
  referral_code: string
  comission_percentage: number
}

export class CreateAffiliateUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository
  ){}

  async execute(props: CreateAffiliateDto): Promise<Error | void> {
    const affiliateAlreadyExists = await this.affiliateRepo.findByEmail(props.email)

    if (affiliateAlreadyExists) {
      return new Error("Affiliate already exists")
    }

    const referralCodeAlreadyExists = await this.affiliateRepo.findByReferralCode(props.referral_code)

    if (referralCodeAlreadyExists) {
      return new Error("Referral code not available")
    }

    const affiliate = new Affiliate({
      name: props.name,
      email: props.email,
      password: "not-defined",
      referral_code: props.referral_code,
      comission_percentage: props.comission_percentage
    })
    await this.affiliateRepo.create(affiliate)

    return void 0
  }
}