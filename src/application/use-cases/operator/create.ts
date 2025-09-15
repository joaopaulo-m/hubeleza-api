import { Operator } from "../../../domain/entities/operator";
import { INVITE_COLABORATOR_EMAIL_HTML } from "../../../shared/emails/invite-colaborator";
import type { IAdminRepository } from "../../contracts/repos/admin";
import type { IOperatorRepository } from "../../contracts/repos/operator";
import type { IEmailService } from "../../contracts/services/email";

export interface CreateOperatorDto {
  admin_id: string
  name: string
  email: string
  sign_up_comission_percentage?: number
  topup_comission_percentage?: number
}

export class CreateOperatorUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository,
    private readonly operatorRepo: IOperatorRepository,
    private readonly emailService: IEmailService
  ){}

  async execute(props: CreateOperatorDto): Promise<Error | void> {
    const admin = await this.adminRepo.findById(props.admin_id)

    if (!admin) {
      return new Error("Admin not found")
    }

    const operatorAlreadyExists = await this.operatorRepo.findByEmail(props.email)

    if (operatorAlreadyExists) {
      return new Error("Operator already exists")
    }

    const operator = new Operator({
      name: props.name,
      email: props.email,
      created_by: admin.name,
      password: "not-defined",
      sign_up_comission_percentage: props.sign_up_comission_percentage,
      topup_comission_percentage: props.topup_comission_percentage
    })
    await this.operatorRepo.create(operator)

    const sendEmailResult = await this.emailService.sendEmail({
      subject: "Você foi convidado para Hubeleza!",
      email: operator.email,
      content: INVITE_COLABORATOR_EMAIL_HTML({
        operator_name: operator.name,
        operator_id: operator.id
      })
    })

    if (sendEmailResult instanceof Error) {
      console.error("Error sending email: ", sendEmailResult)
    }

    return void 0
  }
}