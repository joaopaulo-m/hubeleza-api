import type { Treatment } from "./treatment"
import { Account, type AccountProps } from "./account"

export type PartnerProps = AccountProps & {
  phone_number: string
  cep: string
  lat: string
  lng: string
  treatments: Treatment[]
}

export class Partner extends Account {
  private readonly partnerProps: Omit<PartnerProps, keyof AccountProps>;

  get phone_number() {
    return this.partnerProps.phone_number
  }

  get cep() {
    return this.partnerProps.cep
  }

  get lat() {
    return this.partnerProps.lat
  }

  get lng() {
    return this.partnerProps.lng
  }

  get treatments() {
    return this.partnerProps.treatments
  }

  constructor(props: Omit<PartnerProps, "id" | "created_at"> & { id?: string, created_at?: number }) {
    super(props)
    this.partnerProps = {
      phone_number: props.phone_number,
      cep: props.cep,
      lat: props.lat,
      lng: props.lng,
      treatments: props.treatments
    }
  }

  public updateName(name: string) {
    this.props.name = name
  }

  public updatePhoneNumber(phone_number: string) {
    this.partnerProps.phone_number = phone_number
  }

  public updateCep(cep: string) {
    this.partnerProps.cep = cep
  }

  public updateLat(lat: string) {
    this.partnerProps.lat = lat
  }

  public updateLng(lng: string) {
    this.partnerProps.lng = lng
  }

  public updateTreatments(treatments: Treatment[]) {
    this.partnerProps.treatments = treatments
  }
}