import { TransactionStatus } from "../../../domain/enums/transaction-status";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { IEmailService } from "../../contracts/services/email";
import type { IMessagingService } from "../../contracts/services/messaging";

export interface VerifyPartnerConfirmationDto {
  transaction_id: string
  partner_id: string
}

export class VerifyPartnerConfirmationUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly transactionRepo: ITransactionRepository,
    private readonly emailService: IEmailService,
    private readonly messagingService: IMessagingService
  ){}

  async execute(props: VerifyPartnerConfirmationDto): Promise<Error | void> {
    const transaction = await this.transactionRepo.findById(props.transaction_id)

    if (!transaction) {
      return new Error("Transaction not found")
    }

    if (transaction.status === TransactionStatus.PAID) {
      return
    }

    const partner = await this.partnerRepo.findById(props.partner_id)

    if (!partner) {
      return new Error("Partner not found")
    }

    await this.emailService.sendEmail({
      email: partner.email,
      content: `Oi ${partner.name}, Você ainda não completou seu cadastro na Hubeleza!`,
      subject: "HUBELEZA: Cadastro pendente de confirmação"
    })

    await this.messagingService.sendMessage({
      phone_number: partner.phone_number,
      message: `Oi ${partner.name}, Você ainda não completou seu cadastro na Hubeleza!`
    })
  }
}