import { PartnerStatus } from "../../../domain/enums/partner-status";
import { AffiliateCommissionType } from "../../../shared/enums/affiliate-comission-type";
import { ComissionType } from "../../../shared/enums/comission-type";
import type { IInviteTokenRepository } from "../../contracts/repos/invite-token";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { IContractService } from "../../contracts/services/contract";
import type { IMessagingService } from "../../contracts/services/messaging";
import type { AddAffiliateComissionUseCase } from "../affiliate/add-comission";
import type { AddOperatorComissionUseCase } from "../operator/add-comission";

export interface ConfirmPartnerAccountDto {
  partner_id: string
  transaction_id: string
}

export class ConfirmPartnerAccountUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly inviteTokenRepo: IInviteTokenRepository,
    private readonly contractService: IContractService,
    private readonly messagingService: IMessagingService,
    private readonly addOperatorComissionUseCase: AddOperatorComissionUseCase,
    private readonly addAffiliateComissionUseCase: AddAffiliateComissionUseCase
  ){}

  async execute(props: ConfirmPartnerAccountDto): Promise<Error | void> {
    const partner = await this.partnerRepo.findById(props.partner_id)

    if (!partner) {
      return new Error("Partner not found")
    }

    if (partner.status !== PartnerStatus.PAYMENT_PENDING) {
      console.error("Invalid partner account confirmation: ", partner.id)
      return new Error("Invalid partner")
    }

    partner.updateStatus(PartnerStatus.CONFIRMATION_PENDING)
    await this.partnerRepo.update(partner)

    const contractBuffer = await this.contractService.generatePDF({
      client_name: partner.name,
      company_name: partner.company_name,
      cpf: partner.cpf,
      city: partner.city,
      state: partner.state
    })

    const sendDocumentResult = await this.messagingService.sendDocument({
      phone_number: partner.phone_number,
      document_name: `Contrato-${partner.company_name.replace(" ", "-")}`,
      caption: "Contrato Hubeleza",
      document_base64: contractBuffer.toString('base64'),
      mimetype: "application/pdf"
    })

    if (sendDocumentResult instanceof Error) {
      console.error("Error sending document: ", sendDocumentResult)
    }

    const inviteToken = await this.inviteTokenRepo.findByTransactionId(props.transaction_id)

    if (inviteToken && inviteToken.operator_id) {
      const comissionOperatorResult = await this.addOperatorComissionUseCase.execute({
        operator_id: inviteToken.operator_id,
        transaction_id: props.transaction_id,
        comission_type: ComissionType.SIGN_UP,
        partner_id: partner.id
      })

      if (comissionOperatorResult instanceof Error) {
        console.error("Error comissioning operator: ", comissionOperatorResult)
      } else {
        this.inviteTokenRepo.delete(inviteToken.id)
      }
    }

    if (partner.affiliate_id) {
      const addAffiliateComissionResult = await this.addAffiliateComissionUseCase.execute({
        type: AffiliateCommissionType.SIGN_UP,
        transaction_id: props.transaction_id,
        affiliate_id: partner.affiliate_id,
        partner_id: partner.id
      })

      if (addAffiliateComissionResult instanceof Error) {
        console.error("Error adding affiliate comission: ", addAffiliateComissionResult)
      }
    }

    return void 0
  }
}