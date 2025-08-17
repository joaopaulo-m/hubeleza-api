import type { IAdminRepository } from "../../contracts/repos/admin";

export interface DeleteAdminDto {
  account_id: string
  admin_id: string
}

export class DeleteAdminUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository
  ){}

  async execute(props: DeleteAdminDto): Promise<Error | void> {
    const superadmin = await this.adminRepo.findById(props.account_id)

    if (!superadmin) {
      return new Error("Not allowed")
    } else if (!superadmin.superadmin) {
      return new Error("Not allowed")
    }

    const adminExists = await this.adminRepo.findById(props.admin_id)

    if (!adminExists) {
      return new Error('Admin does not exists')
    }

    await this.adminRepo.delete(adminExists.id)
  }
}