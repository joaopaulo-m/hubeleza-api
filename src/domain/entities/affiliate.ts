import { Account, type AccountProps } from "./account";

export type AffiliateProps = AccountProps & {
  comission_percentage: number
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

  get referral_code() {
    return this.affiliateProps.referral_code
  }

  constructor(props: CreateAffiliateProps) {
    super(props)
    this.affiliateProps = {
      comission_percentage: props.comission_percentage,
      referral_code: props.referral_code
    }
  }

  public updateComissionPercentage(comission_percentage: number) {
    this.affiliateProps.comission_percentage = comission_percentage
  }

  public updateReferralCode(code: string) {
    this.affiliateProps.referral_code = code
  }
}