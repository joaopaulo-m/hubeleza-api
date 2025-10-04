import { hash } from 'bcryptjs'

import { Affiliate } from "../../../domain/entities/affiliate"
import type { IAffiliateRepository } from "../../contracts/repos/affiliate"
import type { IAffiliateWalletRepository } from "../../contracts/repos/affiliate-wallet"
import { AffiliateStatus } from '../../../domain/enums/affiliate-status'
import { AffiliateWallet } from '../../../domain/entities/affiliate-wallet'

export interface SignAffiliateUpDto {
  name: string
  email: string
  password: string
  referral_code: string
  phone_number: string
  ig_username: string
  document: string
}

export class SignAffiliateUpUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository,
    private readonly affiliateWalletRepo: IAffiliateWalletRepository
  ){}

  async execute(props: SignAffiliateUpDto): Promise<Error | void> {
    const affiliateAlreadyExists = await this.affiliateRepo.findByEmail(props.email)
    
    if (affiliateAlreadyExists) {
      return new Error("Affiliate already exists")
    }

    const referralCodeAlreadyExists = await this.affiliateRepo.findByReferralCode(props.referral_code)

    if (referralCodeAlreadyExists) {
      return new Error("Referral code not available")
    }

    const passwordHash = await hash(props.password, 10)
    const affiliate = new Affiliate({
      name: props.name,
      email: props.email,
      password: passwordHash,
      status: AffiliateStatus.CONFIRMATION_PENDING,
      phone_number: props.phone_number,
      ig_username: props.ig_username,
      referral_code: props.referral_code,
      comission_percentage: 0,
      lead_comission_amount: 0
    })
    const wallet = new AffiliateWallet({
      affiliate_id: affiliate.id,
      document: props.document,
      balance: 0
    })

    await this.affiliateRepo.create(affiliate)
    await this.affiliateWalletRepo.create(wallet)

    return void 0;
  }
}