import { randomUUID } from "node:crypto"

import { TransactionType } from "../enums/transaction-type"

export type AffiliateTransactionProps = {
  id: string
  affiliate_wallet_id: string
  type: TransactionType
  amount: number
  created_at: number
  comission_percentage?: number
  partner_id?: string
}

export class AffiliateTransaction {
  private readonly props: AffiliateTransactionProps

  get id() {
    return this.props.id
  }

  get affiliate_wallet_id() {
    return this.props.affiliate_wallet_id
  }

  get type() {
    return this.props.type
  }

  get amount() {
    return this.props.amount
  }

  get created_at() {
    return this.props.created_at
  }

  get comission_percentage() {
    return this.props.comission_percentage
  }
  
  get partner_id() {
    return this.props.partner_id
  }

  constructor(props: Omit<AffiliateTransactionProps, "id" | "created_at"> & { id?: string, created_at?: number }) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at || Date.now()
    }
  }
}