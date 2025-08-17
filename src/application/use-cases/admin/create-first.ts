import bcrypt from 'bcryptjs'

import { Admin } from "../../../domain/entities/admin";
import type { IAdminRepository } from "../../contracts/repos/admin";

export interface CreateFirstAdminDto {
  name: string
  email: string
  password: string
}

export class CreateFirstAdminUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository
  ){}

  async execute(props: CreateFirstAdminDto): Promise<Error | void> {
    const adminsCount = await this.adminRepository.countAll()

    if (adminsCount !== 0) {
      return new Error("Not first admin")
    }

    const passwordHash = await bcrypt.hash(props.password, 10)
    const admin = new Admin({
      name: props.name,
      email: props.email,
      password: passwordHash,
      superadmin: true
    })


    await this.adminRepository.create(admin)
    return void 0;
  }
}