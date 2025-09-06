import { randomUUID } from "node:crypto";

import type { TreatmentCategory } from "../enums/treatment-category";
import type { TreatmentStatePrice } from "./treatment-state-price";

export type TreatmentProps = {
  id: string
  name: string
  price: number
  category: TreatmentCategory
  state_prices: TreatmentStatePrice[]
}

export class Treatment {
  private readonly props: TreatmentProps;

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get category() {
    return this.props.category
  }

  get state_prices() {
    return this.props.state_prices
  }

  constructor(props: Omit<TreatmentProps, 'id'> & { id?: string }) {
    this.props = {
      id: props.id || randomUUID(),
      name: props.name,
      price: props.price,
      category: props.category,
      state_prices: props.state_prices
    }
  }

  public updateName(name: string) {
    this.props.name = name
  }

  public updatePrice(price: number) {
    this.props.price = price
  }

  public updateCategory(category: TreatmentCategory) {
    this.props.category = category
  }

  public removeStatePrice(id: string): Error | void {
    const statePrice = this.state_prices.find(price => price.id === id)

    if (!statePrice) {
      return new Error("State price not found")
    }

    const index = this.state_prices.findIndex(price => price.id === id) as number
    this.state_prices.splice(index, 1)
  }

  public addStatePrice(state_price: TreatmentStatePrice) {
    this.state_prices.push(state_price)
  }
}