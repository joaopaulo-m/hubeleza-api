import { LeadDispatch } from "../../../domain/entities/lead-dispatch";
import { Transaction } from "../../../domain/entities/transaction";
import { PartnerStatus } from "../../../domain/enums/partner-status";
import { TransactionStatus } from "../../../domain/enums/transaction-status";
import { TransactionType } from "../../../domain/enums/transaction-type";
import { createSendLeadToPartnerMessage } from "../../../domain/messages/send-lead";
import { MAX_NEGATIVE_WALLET_BALANCE } from "../../../shared/constants/max-negative-wallet-balance";
import { WALLET_RECHARGE_THRESHOLD } from "../../../shared/constants/wallet-recharge-threshold";
import type { IConfigRepository } from "../../contracts/repos/config";
import type { ILeadRepository } from "../../contracts/repos/lead";
import type { ILeadDispatchRepository } from "../../contracts/repos/lead-dispatch";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IWalletRepository } from "../../contracts/repos/wallet";
import type { IMessagingService } from "../../contracts/services/messaging";

export interface SendLeadToPartnerDto {
  lead_id: string;
  partner_id: string;
  treatment_ids: string[];
}

export class SendLeadToParnterUseCase {
  constructor(
    private readonly leadRepo: ILeadRepository,
    private readonly partnerRepo: IPartnerRepository,
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly leadDispatchRepo: ILeadDispatchRepository,
    private readonly walletRepo: IWalletRepository,
    private readonly transactionRepo: ITransactionRepository,
    private readonly configRepo: IConfigRepository,
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
    if (
      partner.status !== PartnerStatus.ACTIVE &&
      partner.status !== PartnerStatus.RECHARGE_REQUIRED
    ) {
      console.error("Invalid partner: ", partner.id)
      return new Error("Invalid partner")
    }

    const wallet = await this.walletRepo.findByPartnerId(partner.id)

    if (!wallet) {
      return new Error("Partner does not have a wallet")
    }

    const leadPrice = await this.configRepo.getLeadPrice()
    if (wallet.balance < MAX_NEGATIVE_WALLET_BALANCE) {
      console.error("Insufficient wallet balance: ", wallet)
      return new Error("Insufficient wallet balance")
    }

    const allTreatments = await this.treatmentRepo.getAll()

    if (!props.treatment_ids.some(treatmentId => allTreatments.map(t => t.id).includes(treatmentId))) {
      return new Error("Some treatment does not exists")
    }

    const message = createSendLeadToPartnerMessage(lead)
    const sendMessageResult = await this.messagingService.sendMessage({
      phone_number: lead.phone_number,
      message
    })

    if (sendMessageResult instanceof Error) {
      console.error("Failed to send message to partner: ", sendMessageResult);
      return new Error("Failed to send message to partner");
    }

    const transaction = new Transaction({
      wallet_id: wallet.id,
      status: TransactionStatus.RECEIVED,
      type: TransactionType.EXPENSE,
      amount: leadPrice,
      lead,
      lead_price: leadPrice
    })

    const debitWalletResult = wallet.debit(leadPrice)

    if (debitWalletResult instanceof Error) {
      console.error("Error debiting partner wallet: ", debitWalletResult)
      return debitWalletResult
    }

    const leadDispatch = new LeadDispatch({
      lead: lead,
      partner,
      treatments: props.treatment_ids.map(treatmentId => {
        const index = allTreatments.findIndex(treatment => treatment.id === treatmentId) as number

        return allTreatments[index]
      }),
      message_sent: message
    })

    if (wallet.balance < WALLET_RECHARGE_THRESHOLD && partner.status !== PartnerStatus.RECHARGE_REQUIRED) {
      partner.updateStatus(PartnerStatus.RECHARGE_REQUIRED)
      await this.partnerRepo.update(partner)
    }
    await this.walletRepo.update(wallet);
    await this.transactionRepo.create(transaction);
    await this.leadDispatchRepo.create(leadDispatch);
    return void 0;
  }
}