import bcrypt from 'bcryptjs'

import type { IInviteTokenRepository } from "../../../application/contracts/repos/invite-token";
import type { IPartnerRepository } from "../../../application/contracts/repos/partner";
import { Partner } from "../../../domain/entities/partner";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IGeolocationService } from "../../contracts/services/geolocation";
import type { IWalletRepository } from '../../contracts/repos/wallet';
import type { IPaymentService } from '../../contracts/services/payment';
import { Wallet } from '../../../domain/entities/wallet';
import type { State } from '../../../domain/enums/state';
import type { CreateWalletPaymentUseCase } from '../wallet/create-payment';
import { PARTNER_INITAL_PAYMENT_AMOUNT } from '../../../shared/constants/inital-partner-payment-amount';
import type { AxiosError } from 'axios';
import type { IOperatorRepository } from '../../contracts/repos/operator';
import type { IQueueService } from '../../contracts/services/queue';
import type { VerifyPartnerConfirmationDto } from './verify-confirmation';

export interface SignPartnerUpDto {
  invite_token: string
  name: string
  company_name: string
  cpf: string
  cnpj?: string
  email: string
  password: string
  phone_number: string
  cep: string
  city: string
  state: string
  treatment_ids: string[]
}

export type SignPartnerUpReturn = {
  transaction_id: string
  qr_code: string
  pix_copy_paste_code: string
}

export class SignPartnerUpUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly inviteTokenRepo: IInviteTokenRepository,
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly walletRepo: IWalletRepository,
    private readonly operatorRepo: IOperatorRepository,
    private readonly geolocationService: IGeolocationService,
    private readonly paymentService: IPaymentService,
    private readonly queueService: IQueueService,
    private readonly createWalletPaymentUseCase: CreateWalletPaymentUseCase
  ){}

  async execute(props: SignPartnerUpDto): Promise<Error | SignPartnerUpReturn> {
    const inviteToken = await this.inviteTokenRepo.findByToken(props.invite_token)

    if (!inviteToken) {
      return new Error("Token not found")
    }

    const partnerAlreadyExists = await this.partnerRepo.findByCpf(props.cpf)
    
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
      company_name: props.company_name,
      cpf: props.cpf,
      cnpj: props.cnpj,
      email: props.email,
      password: passwordHash,
      name: props.name,
      phone_number: props.phone_number,
      cep: props.cep,
      city: props.city,
      state: props.state as State,
      lat,
      lng,
      treatments: treatments.filter(treatment => props.treatment_ids.includes(treatment.id)),
      operator_id: inviteToken.operator_id
    })

    const createWalletResult = await this.paymentService.createWallet({
      name: partner.name,
      document: props.cpf,
      phone_number: props.phone_number
    })

    if (createWalletResult instanceof Error) {
      console.error("Error creating partner wallet: ", (createWalletResult as AxiosError).response?.data)
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

    const createInitialPaymentResult = await this.createWalletPaymentUseCase.execute({
      wallet_id: partnerWallet.id,
      amount: PARTNER_INITAL_PAYMENT_AMOUNT
    })

    if (createInitialPaymentResult instanceof Error) {
      return new Error("Error creating partner initial payment: ", createInitialPaymentResult)
    }

    await this.queueService.add<VerifyPartnerConfirmationDto>({
      name: "verify_account_confirmation",
      data: {
        partner_id: partner.id,
        transaction_id: createInitialPaymentResult.transaction_id,
      },
      delay: 30 * 60 * 1000 // 30 min
    })

    if (inviteToken.operator_id) {
      const operator = await this.operatorRepo.findById(inviteToken.operator_id)
      
      if (operator && operator.sign_up_comission_percentage) {
        const addTransactionToOperatorInviteResult = await this.inviteTokenRepo.addTransaction(inviteToken.id, createInitialPaymentResult.transaction_id)
        
        if (!addTransactionToOperatorInviteResult) {
          console.error("Error add transaction to invite token: ", addTransactionToOperatorInviteResult)
        }
      } else {
        await this.inviteTokenRepo.delete(inviteToken.id)
      }
    } else {
      await this.inviteTokenRepo.delete(inviteToken.id)
    }

    return createInitialPaymentResult;
  }
}