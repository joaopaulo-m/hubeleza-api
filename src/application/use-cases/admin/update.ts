import bcrypt from 'bcryptjs'

import type { IAdminRepository } from "../../contracts/repos/admin";

export interface UpdateAdminDto {
  account_id: string
  name?: string
  password?: string
}

export class UpdateAdminUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository
  ){}

  async execute(props: UpdateAdminDto): Promise<Error | void> {
    const admin = await this.adminRepo.findById(props.account_id)

    if (!admin) {
      return new Error("Admin not found")
    }

    if (props.name) {
      admin.updateName(props.name)
    }

    if (props.password) {
      const passwordHash = await bcrypt.hash(props.password, 10)

      admin.updatePassword(passwordHash)
    }

    await this.adminRepo.update(admin)
    return void 0;
  }
}
