import { randomUUID } from "node:crypto";

export type AffiliateWalletProps = {
  id: string
  affiliate_id: string
  document: string
  balance: number
}

export class AffiliateWallet {
  private readonly props: AffiliateWalletProps;

  get id() {
    return this.props.id
  }

  get affiliate_id() {
    return this.props.affiliate_id
  }

  get document() {
    return this.props.document
  }

  get balance() {
    return this.props.balance
  }

  constructor(props: Omit<AffiliateWalletProps, 'id'> & { id?: string }) {
    this.props = {
      ...props,
      id: props.id || randomUUID()
    }
  }

  public debit(amount: number): Error | void {
    if (amount < 0) {
      return new Error("Negative amount")
    }

    if (amount > this.props.balance) {
      return new Error("Insufficient balance amount")
    }

    this.props.balance -= amount
  }

  public credit(amount: number): Error | void {
    if (amount < 0) {
      return new Error("Negative amount")
    }

    this.props.balance += amount
  }
}