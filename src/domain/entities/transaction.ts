import { randomUUID } from "node:crypto"

import type { TransactionType } from "../enums/transaction-type"
import type { Lead } from "./lead"

export type TransactionProps = {
  id: string
  wallet_id: string
  type: TransactionType
  amount: number
  lead_price: number
  created_at: number
  lead?: Lead
}

export class Transaction {
  private readonly props: TransactionProps

  get id() {
    return this.props.id
  }

  get wallet_id() {
    return this.props.wallet_id
  }

  get type() {
    return this.props.type
  }

  get amount() {
    return this.props.amount
  }

  get lead_price() {
    return this.props.lead_price
  }

  get created_at() {
    return this.props.created_at
  }

  get lead() {
    return this.props.lead
  }

  constructor(props: Omit<TransactionProps, "id" | "created_at"> & { id?: string, created_at?: number }) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at || Date.now()
    }
  }
}