import bcrypt from 'bcryptjs'

import { Admin } from "../../../domain/entities/admin";
import { Partner } from "../../../domain/entities/partner";
import type { IAdminRepository } from "../../contracts/repos/admin";
import type { IPartnerRepository } from "../../contracts/repos/partner";

export interface DefinePasswordDto {
  account_id: string
  password: string
}

export class DefinePasswordUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly adminRepo: IAdminRepository
  ){}

  async execute(props: DefinePasswordDto): Promise<Error | void> {
    const account = await this.findAccount(props.account_id)

    if (!account) {
      return new Error("Account not found")
    }

    if (account.password !== 'not-defined') {
      return new Error("Account password already defined")
    }

    const passwordHash = await bcrypt.hash(props.password, 10)
    account.updatePassword(passwordHash)

    if (account instanceof Partner) {
      await this.partnerRepo.update(account)
    }

    if (account instanceof Admin) {
      await this.adminRepo.update(account)
    }

    return void 0;
  }

  private async findAccount(id: string): Promise<null | (Partner | Admin)> {
    const partner = await this.partnerRepo.findById(id)

    if (partner) return partner

    const admin = await this.adminRepo.findById(id)

    if (admin) return admin
    
    return null
  }
}