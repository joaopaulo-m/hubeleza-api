import bcrypt from 'bcryptjs'

import type { IInviteTokenRepository } from "../../../application/contracts/repos/invite-token";
import type { IPartnerRepository } from "../../../application/contracts/repos/partner";
import { Partner } from "../../../domain/entities/partner";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IGeolocationService } from "../../contracts/services/geolocation";
import type { IWalletRepository } from '../../contracts/repos/wallet';
import type { IPaymentService } from '../../contracts/services/payment';
import { Wallet } from '../../../domain/entities/wallet';

export interface SignPartnerUpDto {
  invite_token: string
  name: string
  email: string
  password: string
  phone_number: string
  cep: string
  document: string
  treatment_ids: string[]
}

export class SignPartnerUpUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly inviteTokenRepo: IInviteTokenRepository,
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly walletRepo: IWalletRepository,
    private readonly geolocationService: IGeolocationService,
    private readonly paymentService: IPaymentService
  ){}

  async execute(props: SignPartnerUpDto): Promise<Error | void> {
    const inviteToken = await this.inviteTokenRepo.findByToken(props.invite_token)

    if (!inviteToken) {
      return new Error("Token not found")
    }

    if (inviteToken.expires_at < Date.now()) {
      return new Error("Invite token expired")
    }

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

    const passwordHash = await bcrypt.hash(props.password, 10)
    const partner = new Partner({
      email: props.email,
      password: passwordHash,
      name: props.name,
      phone_number: props.phone_number,
      cep: props.cep,
      lat,
      lng,
      treatments: treatments.filter(treatment => props.treatment_ids.includes(treatment.id))
    })

    const createWalletResult = await this.paymentService.createWallet({
      name: partner.name,
      document: props.document,
      phone_number: props.phone_number
    })

    if (createWalletResult instanceof Error) {
      console.error("Error creating partner wallet: ", createWalletResult)
      return createWalletResult
    }

    const partnerWallet = new Wallet({
      partner_id: partner.id,
      external_id: createWalletResult.wallet_id,
      document: props.document,
      balance: 0,
      transactions: []
    })

    await this.partnerRepo.create(partner)
    await this.walletRepo.create(partnerWallet)
    await this.inviteTokenRepo.delete(inviteToken.id)
    return void 0;
  }
}