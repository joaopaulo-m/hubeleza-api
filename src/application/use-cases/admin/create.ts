import { Admin } from "../../../domain/entities/admin";
import type { IAdminRepository } from "../../contracts/repos/admin";

export interface CreateAdminDto {
  account_id: string
  name: string
  email: string
  superadmin: boolean
}

export class CreateAdminUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository
  ){}

  async execute(props: CreateAdminDto): Promise<Error | void> {
    const superadmin = await this.adminRepo.findById(props.account_id)

    if (!superadmin) {
      return new Error("Not allowed")
    } else if (!superadmin.superadmin && props.superadmin) {
      return new Error("Not allowed")
    }

    const admin = new Admin({
      name: props.name,
      email: props.email,
      password: "not-defined",
      superadmin: props.superadmin
    })
    await this.adminRepo.create(admin)

    return void 0;
  }
}
