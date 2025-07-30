import { LeadDispatch } from "../../../domain/entities/lead-dispatch";
import { createSendLeadToPartnerMessage } from "../../../domain/messages/send-lead";
import type { ILeadRepository } from "../../contracts/repos/lead";
import type { ILeadDispatchRepository } from "../../contracts/repos/lead-dispatch";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IMessagingService } from "../../contracts/services/messaging";

export interface SendLeadToPartnerDto {
  lead_id: string;
  partner_id: string;
  treatment_id: string;
}

export class SendLeadToParnterUseCase {
  constructor(
    private readonly leadRepo: ILeadRepository,
    private readonly partnerRepo: IPartnerRepository,
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly leadDispatchRepo: ILeadDispatchRepository,
    private readonly messagingService: IMessagingService
  ){}

  async execute(props: SendLeadToPartnerDto): Promise<Error | void> {
    const lead = await this.leadRepo.findById(props.lead_id);
    if (!lead) {
      return new Error("Lead not found");
    }

    const partner = await this.partnerRepo.findById(props.partner_id);
    if (!partner) {
      return new Error("Partner not found");
    }

    const treatment = await this.treatmentRepo.findById(props.treatment_id);
    if (!treatment) {
      return new Error("Treatment not found");
    }

    const message = createSendLeadToPartnerMessage(lead)
    const sendMessageResult = await this.messagingService.sendMessage({
      phone_number: partner.phone_number,
      message
    })

    if (sendMessageResult instanceof Error) {
      console.error("Failed to send message to partner: ", sendMessageResult);
      return new Error("Failed to send message to partner");
    }

    const leadDispatch = new LeadDispatch({
      lead: lead,
      partner,
      treatment,
      message_sent: message
    })
    await this.leadDispatchRepo.create(leadDispatch);
    
    return void 0;
  }
}