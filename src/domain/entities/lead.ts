import { randomUUID } from "node:crypto"

import type { Treatment } from "./treatment"

export type LeadProps = {
  id: string
  name: string
  phone_number: string
  cep: string
  lat: string
  lng: string
  created_at: number
  treatments: Treatment[]
}

export class Lead {
  private readonly props: LeadProps

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

  get created_at() {
    return this.props.created_at
  }

  get treatments() {
    return this.props.treatments
  }

  constructor(props: Omit<LeadProps, 'id' | 'created_at'> & { id?: string, created_at?: number }) {
    this.props = {
      ...props,
      id: props.id || randomUUID(),
      created_at: props.created_at || Date.now()
    }
  }

  public updateName(name: string): void {
    this.props.name = name
  }

  public updatePhoneNumber(phone_number: string): void {
    this.props.phone_number = phone_number
  }

  public updateCep(cep: string): void {
    this.props.cep = cep
  }

  public updateLat(lat: string): void {
    this.props.lat = lat
  }

  public updateLng(lng: string): void {
    this.props.lng = lng
  }

  public updateTreatments(treatments: Treatment[]): void {
    this.props.treatments = treatments
  }
}