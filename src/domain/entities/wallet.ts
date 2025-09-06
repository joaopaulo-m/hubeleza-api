import { randomUUID } from "node:crypto"

import type { Transaction } from "./transaction"

export type WalletProps = {
  id: string
  partner_id: string
  document: string
  balance: number
  transactions: Transaction[]
  external_id?: string
}

export class Wallet {
  private readonly props: WalletProps

  get id() {
    return this.props.id
  }

  get partner_id() {
    return this.props.partner_id
  }

  get document() {
    return this.props.document
  }

  get external_id() {
    return this.props.external_id
  }

  get balance() {
    return this.props.balance
  }

  get transactions() {
    return this.props.transactions
  }

  constructor(props: Omit<WalletProps, "id"> & { id?: string }){
    this.props = {
      ...props,
      id: props.id || randomUUID()
    }
  }

  public updateExternalId(external_id: string) {
    this.props.external_id = external_id
  }

  public debit(amount: number): Error | void {
    if (amount < 0) {
      return new Error("Negative amount")
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