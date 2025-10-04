import type { AffiliateStatus } from "../enums/affiliate-status";
import { Account, type AccountProps } from "./account";

export type AffiliateProps = AccountProps & {
  status: AffiliateStatus
  phone_number: string
  ig_username: string
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

  get status() {
    return this.affiliateProps.status
  }

  get phone_number() {
    return this.affiliateProps.phone_number
  }

  get ig_username() {
    return this.affiliateProps.ig_username
  }

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
      status: props.status,
      phone_number: props.phone_number,
      ig_username: props.ig_username,
      comission_percentage: props.comission_percentage,
      lead_comission_amount: props.lead_comission_amount,
      referral_code: props.referral_code
    }
  }

  public updateStatus(status: AffiliateStatus) {
    this.affiliateProps.status = status
  }

  public updatePhoneNumber(phone_number: string) {
    this.affiliateProps.phone_number = phone_number
  }

  public updateIgUsername(ig_username: string) {
    this.affiliateProps.ig_username = ig_username
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