import { randomUUID } from "node:crypto"

import type { Treatment } from "./treatment"

export type PartnerProps = {
  id: string
  name: string
  phone_number: string
  cep: string
  lat: string
  lng: string
  treatments: Treatment[]
}

export class Partner {
  private readonly props: PartnerProps;

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get phone_number() {
    return this.props.phone_number
  }

  get cep() {
    return this.props.cep
  }

  get lat() {
    return this.props.lat
  }

  get lng() {
    return this.props.lng
  }

  get treatments() {
    return this.props.treatments
  }

  constructor(props: Omit<PartnerProps, "id"> & { id?: string }) {
    this.props = {
      ...props,
      id: props.id || randomUUID()
    }
  }

  public updateName(name: string) {
    this.props.name = name
  }

  public updatePhoneNumber(phone_number: string) {
    this.props.phone_number = phone_number
  }

  public updateCep(cep: string) {
    this.props.cep = cep
  }

  public updateLat(lat: string) {
    this.props.lat = lat
  }

  public updateLng(lng: string) {
    this.props.lng = lng
  }

  public updateTreatments(treatments: Treatment[]) {
    this.props.treatments = treatments
  }
}