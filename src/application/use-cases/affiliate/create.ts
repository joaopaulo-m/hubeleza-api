import { Affiliate } from "../../../domain/entities/affiliate";
import { AffiliateWallet } from "../../../domain/entities/affiliate-wallet";
import type { IAffiliateRepository } from "../../contracts/repos/affiliate";
import type { IAffiliateWalletRepository } from "../../contracts/repos/affiliate-wallet";

export interface CreateAffiliateDto {
  name: string
  email: string
  referral_code: string
  comission_percentage: number
  document: string
}

export class CreateAffiliateUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository,
    private readonly affiliateWalletRepo: IAffiliateWalletRepository
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
    const wallet = new AffiliateWallet({
      affiliate_id: affiliate.id,
      document: props.document,
      balance: 0
    })

    await this.affiliateRepo.create(affiliate)
    await this.affiliateWalletRepo.create(wallet)

    return void 0
  }
}