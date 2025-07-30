import { randomUUID } from "node:crypto";

export type TreatmentProps = {
  id: string
  name: string
}

export class Treatment {
  private readonly props: TreatmentProps;

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  constructor(props: Omit<TreatmentProps, 'id'> & { id?: string }) {
    this.props = {
      id: props.id || randomUUID(),
      name: props.name
    }
  }

  public updateName(name: string) {
    this.props.name = name
  }
}