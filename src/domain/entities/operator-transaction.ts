import { randomUUID } from "node:crypto"

import { TransactionType } from "../enums/transaction-type"
import type { ComissionType } from "../../shared/enums/comission-type"

export type OperatorTransactionProps = {
  id: string
  operator_wallet_id: string
  type: TransactionType
  amount: number
  created_at: number
  external_id?: string
  comission_percentage?: number
  comission_type?: ComissionType
  partner_id?: string
}

export class OperatorTransaction {
  private readonly props: OperatorTransactionProps

  get id() {
    return this.props.id
  }

  get operator_wallet_id() {
    return this.props.operator_wallet_id
  }

  get external_id() {
    return this.props.external_id
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

  get comission_type() {
    return this.props.comission_type
  }

  get partner_id() {
    return this.props.partner_id
  }

  constructor(props: Omit<OperatorTransactionProps, "id" | "created_at"> & { id?: string, created_at?: number }) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at || Date.now()
    }
  }
}