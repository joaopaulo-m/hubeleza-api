import { Operator } from "../../../domain/entities/operator";
import type { IAdminRepository } from "../../contracts/repos/admin";
import type { IOperatorRepository } from "../../contracts/repos/operator";

export interface CreateOperatorDto {
  admin_id: string
  name: string
  email: string
}

export class CreateOperatorUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository,
    private readonly operatorRepo: IOperatorRepository,
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
    })
    await this.operatorRepo.create(operator)

    return void 0
  }
}