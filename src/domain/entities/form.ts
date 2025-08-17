import { randomUUID } from "node:crypto";

import type { Treatment } from "./treatment";

export type FormProps = {
  id: string
  name: string
  external_form_id: string
  treatments: Treatment[]
}

export class Form {
  private readonly props: FormProps;

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get external_form_id() {
    return this.props.external_form_id
  }

  get treatments() {
    return this.props.treatments;
  }

  constructor(props: Omit<FormProps, 'id'> & { id?: string }) {
    this.props = {
      ...props,
      id: props.id || randomUUID()
    }
  }

  public updateExternalId(external_form_id: string) {
    this.props.external_form_id = external_form_id
  }

  public updateName(name: string) {
    this.props.name = name
  }

  public updateTreatments(treatments: Treatment[]) {
    this.props.treatments = treatments
  }
}