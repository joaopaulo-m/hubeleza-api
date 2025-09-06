import { randomUUID } from "node:crypto"

import type { State } from "../enums/state"

export type TreatmentStatePriceProps = {
  id: string
  treatment_id: string
  state: State
  price: number
}

export class TreatmentStatePrice {
  private readonly props: TreatmentStatePriceProps;

  get id() {
    return this.props.id
  }

  get treatment_id() {
    return this.props.treatment_id
  }

  get state() {
    return this.props.state
  }

  get price() {
    return this.props.price
  }

  constructor(props: Omit<TreatmentStatePriceProps, "id"> & { id?: string }) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
    }
  }

  public updateState(state: State) {
    this.props.state = state;
  }

  public updatePrice(price: number) {
    this.props.price = price
  }
}