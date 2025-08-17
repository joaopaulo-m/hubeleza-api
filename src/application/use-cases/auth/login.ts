import bcrypt from 'bcryptjs'

import { Partner } from "../../../domain/entities/partner";
import type { Admin } from "../../../domain/entities/admin";
import type { IAdminRepository } from "../../contracts/repos/admin";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { IJwtService } from "../../contracts/services/jwt";
import { AccountType } from "../../../shared/enums/account-type";

export interface LoginDto {
  email: string
  password: string
}

export class LoginUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly adminRepo: IAdminRepository,
    private readonly jwtService: IJwtService,
  ){}

  async execute(props: LoginDto): Promise<Error | { access_token: string }> {
    const account = await this.findAccount(props.email)

    if (!account) {
      return new Error("Account does not exists")
    }

    if (account.password === "not-defined") {
      const token = this.jwtService.sign({
        account_id: account.id,
        account_type: account instanceof Partner ? AccountType.PARTNER : AccountType.ADMIN
      })

      if (token instanceof Error) {
        return new Error("Error generating access token: ", token)
      }

      return {
        access_token: token
      }
    }

    try {
      const passwordMatch = await bcrypt.compare(props.password, account.password)

      if (!passwordMatch) {
        return new Error("Invalid credentials")
      }

      const tokenResult = this.jwtService.sign({
        account_id: account.id,
        account_type: account instanceof Partner ? AccountType.PARTNER : AccountType.ADMIN
      })

      if (tokenResult instanceof Error) {
        console.log(tokenResult)
        return new Error("Error generating token: ", tokenResult)
      }

      return {
        access_token: tokenResult
      }
    } catch {
      return new Error("Error comparing password hash")
    }
  }

  private async findAccount(email: string): Promise<null | (Partner | Admin)> {
      const partner = await this.partnerRepo.findByEmail(email)
  
      if (partner) return partner
  
      const admin = await this.adminRepo.findByEmail(email)
  
      if (admin) return admin
      
      return null
    }
}