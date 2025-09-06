import type { Treatment } from "./treatment"
import { Account, type AccountProps } from "./account"
import type { State } from "../enums/state"
import { PartnerStatus } from "../enums/partner-status"

export type PartnerProps = AccountProps & {
  company_name: string
  phone_number: string
  status: PartnerStatus
  cpf: string
  cep: string
  city: string
  state: State
  lat: string
  lng: string
  treatments: Treatment[]
  cnpj?: string
}

export class Partner extends Account {
  private readonly partnerProps: Omit<PartnerProps, keyof AccountProps>;

  get company_name() {
    return this.partnerProps.company_name
  }

  get phone_number() {
    return this.partnerProps.phone_number
  }

  get status() {
    return this.partnerProps.status
  }

  get cpf() {
    return this.partnerProps.cpf
  }

  get cep() {
    return this.partnerProps.cep
  }

  get city() {
    return this.partnerProps.city
  }

  get state() {
    return this.partnerProps.state
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

  get cnpj() {
    return this.partnerProps.cnpj
  }

  constructor(props: Omit<PartnerProps, "id" | "created_at" | "status"> & { id?: string, created_at?: number, status?: PartnerStatus }) {
    super(props)
    this.partnerProps = {
      company_name: props.company_name,
      phone_number: props.phone_number,
      status: props.status || PartnerStatus.PAYMENT_PENDING,
      cpf: props.cpf,
      cep: props.cep,
      city: props.city,
      state: props.state,
      lat: props.lat,
      lng: props.lng,
      treatments: props.treatments,
      cnpj: props.cnpj
    }
  }

  public updateStatus(status: PartnerStatus) {
    this.partnerProps.status = status
  }

  public updateName(name: string) {
    this.props.name = name
  }

  public updateCompanyName(company_name: string) {
    this.partnerProps.company_name = company_name
  }

  public updateCpf(cpf: string) {
    this.partnerProps.cpf = cpf
  }

  public updateCnpj(cnpj: string) {
    this.partnerProps.cpf = cnpj
  }

  public updatePhoneNumber(phone_number: string) {
    this.partnerProps.phone_number = phone_number
  }

  public updateCep(cep: string) {
    this.partnerProps.cep = cep
  }

  public updateCity(city: string) {
    this.partnerProps.city = city
  }

  public updateState(state: string) {
    this.partnerProps.state = state as State
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