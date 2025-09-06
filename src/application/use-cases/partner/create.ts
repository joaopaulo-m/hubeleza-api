import { Partner } from "../../../domain/entities/partner";
import { Wallet } from "../../../domain/entities/wallet";
import type { State } from "../../../domain/enums/state";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IWalletRepository } from "../../contracts/repos/wallet";
import type { IGeolocationService } from "../../contracts/services/geolocation";
import type { IPaymentService } from "../../contracts/services/payment";

export interface CreatePartnerDto {
  name: string
  company_name: string
  cpf: string
  cnpj?: string
  email: string
  phone_number: string
  cep: string
  city: string
  state: string
  treatment_ids: string[]
}

export class CreatePartnerUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly walletRepo: IWalletRepository,
    private readonly geolocationService: IGeolocationService,
    private readonly paymentService: IPaymentService,
  ){}

  async execute(props: CreatePartnerDto): Promise<Error | void> {
    const partnerAlreadyExists = await this.partnerRepo.findByPhoneNumber(props.phone_number)

    if (partnerAlreadyExists) {
      return new Error("Partner already exists")
    }

    const treatments = await this.treatmentRepo.getAll()
    const allTreatmentIds = treatments.map(t => t.id)

    if (
      props.treatment_ids
        .some(treatmentId => !allTreatmentIds.includes(treatmentId))
    ) {
      return new Error("Invalid treatment")
    }

    const getCoordinatesResult = await this.geolocationService.getCoordinatesByCEP(props.cep)

    if (getCoordinatesResult instanceof Error) {
      console.error("Error getting partner coordinates: ", getCoordinatesResult)
      return new Error(`Error getting coordinates for partner: ${props.name}`)
    }

    const { lat, lng } = getCoordinatesResult
    const partner = new Partner({
      email: props.email,
      password: "not-defined",
      name: props.name,
      company_name: props.company_name,
      cpf: props.cpf,
      cnpj: props.cnpj,
      phone_number: props.phone_number,
      cep: props.cep,
      city: props.city,
      state: props.state as State,
      lat,
      lng,
      treatments: treatments.filter(treatment => props.treatment_ids.includes(treatment.id))
    })

    const createWalletResult = await this.paymentService.createWallet({
      name: partner.name,
      document: props.cpf,
      phone_number: props.phone_number
    })

    if (createWalletResult instanceof Error) {
      console.error("Error creating partner wallet: ", createWalletResult)
      return createWalletResult
    }

    const partnerWallet = new Wallet({
      partner_id: partner.id,
      external_id: createWalletResult.wallet_id,
      document: props.cpf,
      balance: 0,
      transactions: []
    })

    await this.partnerRepo.create(partner)
    await this.walletRepo.create(partnerWallet)
    return void 0;
  }
}