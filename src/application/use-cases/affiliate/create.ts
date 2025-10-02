import { Affiliate } from "../../../domain/entities/affiliate";
import { AffiliateWallet } from "../../../domain/entities/affiliate-wallet";
import { INVITE_AFFILIATE_EMAIL_HTML } from "../../../shared/emails/invite-affiliate";
import type { IAffiliateRepository } from "../../contracts/repos/affiliate";
import type { IAffiliateWalletRepository } from "../../contracts/repos/affiliate-wallet";
import type { IEmailService } from "../../contracts/services/email";

export interface CreateAffiliateDto {
  name: string
  email: string
  referral_code: string
  comission_percentage: number
  lead_comission_amount?: number
  document: string
}

export class CreateAffiliateUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository,
    private readonly affiliateWalletRepo: IAffiliateWalletRepository,
    private readonly emailService: IEmailService
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
      comission_percentage: props.comission_percentage,
      lead_comission_amount: props.lead_comission_amount
    })
    const wallet = new AffiliateWallet({
      affiliate_id: affiliate.id,
      document: props.document,
      balance: 0
    })

    await this.affiliateRepo.create(affiliate)
    await this.affiliateWalletRepo.create(wallet)

    const sendDefinePasswordEmailResult = await this.emailService.sendEmail({
      subject: "Você foi convidado para Hubeleza!",
      email: affiliate.email,
      content: INVITE_AFFILIATE_EMAIL_HTML({
        affiliate_id: affiliate.id,
        affiliate_name: affiliate.name
      })
    })

    if (sendDefinePasswordEmailResult instanceof Error) {
      console.error("Error sending affiliate define password email: ", sendDefinePasswordEmailResult)
    }

    return void 0
  }
}