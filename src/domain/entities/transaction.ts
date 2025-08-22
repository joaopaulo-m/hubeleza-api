import { randomUUID } from "node:crypto"

import { TransactionType } from "../enums/transaction-type"
import type { Lead } from "./lead"
import { TransactionStatus } from "../enums/transaction-status"

export type TransactionProps = {
  id: string
  wallet_id: string
  type: TransactionType
  status: TransactionStatus
  amount: number
  created_at: number
  external_id?: string
  lead_price?: number
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

  get external_id() {
    return this.props.external_id
  }

  get type() {
    return this.props.type
  }

  get status() {
    return this.props.status
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

  public updateStatus(status: TransactionStatus): Error | void {
    if (
      this.props.type === TransactionType.INCOME && 
      (status === TransactionStatus.RECEIVED || status === TransactionStatus.PENDING_RECEIPT)
    ) {
      return new Error("Invalid status for this type of transaction")
    }
  
    if (
      this.props.type === TransactionType.EXPENSE && 
      (status === TransactionStatus.PAID || status === TransactionStatus.PENDING_PAYMENT)
    ) {
      return new Error("Invalid status for this type of transaction")
    }

    this.props.status = status
  }
}