import { randomUUID } from "node:crypto"

import type { OperatorTransaction } from "./operator-transaction"

export type OperatorWalletProps = {
  id: string
  operator_id: string
  document: string
  balance: number
  transactions: OperatorTransaction[]
  external_id?: string
}

export class OperatorWallet {
  private readonly props: OperatorWalletProps

  get id() {
    return this.props.id
  }

  get operator_id() {
    return this.props.operator_id
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

  constructor(props: Omit<OperatorWalletProps, "id"> & { id?: string }){
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