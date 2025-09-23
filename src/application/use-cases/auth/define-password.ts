import bcrypt from 'bcryptjs'

import { Admin } from "../../../domain/entities/admin";
import { Partner } from "../../../domain/entities/partner";
import type { IAdminRepository } from "../../contracts/repos/admin";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import { Operator } from '../../../domain/entities/operator';
import type { IOperatorRepository } from '../../contracts/repos/operator';
import { Affiliate } from '../../../domain/entities/affiliate';
import type { IAffiliateRepository } from '../../contracts/repos/affiliate';

export interface DefinePasswordDto {
  account_id: string
  password: string
}

export class DefinePasswordUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly adminRepo: IAdminRepository,
    private readonly operatorRepo: IOperatorRepository,
    private readonly affiliateRepo: IAffiliateRepository
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

    if (account instanceof Operator) {
      await this.operatorRepo.update(account)
    }

    if (account instanceof Affiliate) {
      await this.affiliateRepo.update(account)
    }

    return void 0;
  }

  private async findAccount(email: string): Promise<null | (Partner | Operator | Admin | Affiliate)> {
    const partner = await this.partnerRepo.findByEmail(email)

    if (partner) return partner

    const admin = await this.adminRepo.findByEmail(email)

    if (admin) return admin

    const operator = await this.operatorRepo.findByEmail(email)

    if (operator) return operator

    const affiliate = await this.affiliateRepo.findByEmail(email)

    if (affiliate) return affiliate
    
    return null
  }
}