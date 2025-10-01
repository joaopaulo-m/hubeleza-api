import { Account, type AccountProps } from "./account";

export type AffiliateProps = AccountProps & {
  comission_percentage: number
  lead_comission_amount?: number
  referral_code: string
}

type CreateAffiliateProps = Omit<AffiliateProps, 'id' | 'created_at'> & {
  id?: string
  created_at?: number
}

export class Affiliate extends Account {
  private readonly affiliateProps: Omit<AffiliateProps, keyof AccountProps>

  get comission_percentage() {
    return this.affiliateProps.comission_percentage
  }

  get lead_comission_amount() {
    return this.affiliateProps.lead_comission_amount
  }

  get referral_code() {
    return this.affiliateProps.referral_code
  }

  constructor(props: CreateAffiliateProps) {
    super(props)
    this.affiliateProps = {
      comission_percentage: props.comission_percentage,
      lead_comission_amount: props.lead_comission_amount,
      referral_code: props.referral_code
    }
  }

  public updateComissionPercentage(comission_percentage: number) {
    this.affiliateProps.comission_percentage = comission_percentage
  }

  public updateLeadComissionAmount(lead_comission_amount: number) {
    this.affiliateProps.lead_comission_amount = lead_comission_amount
  }

  public updateReferralCode(code: string) {
    this.affiliateProps.referral_code = code
  }
}