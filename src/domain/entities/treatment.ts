import { randomUUID } from "node:crypto";

export type TreatmentProps = {
  id: string
  name: string
  price: number
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

  constructor(props: Omit<TreatmentProps, 'id'> & { id?: string }) {
    this.props = {
      id: props.id || randomUUID(),
      name: props.name,
      price: props.price
    }
  }

  public updateName(name: string) {
    this.props.name = name
  }

  public updatePrice(price: number) {
    this.props.price = price
  }
}