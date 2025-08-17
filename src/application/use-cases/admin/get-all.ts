import type { IAdminRepository } from "../../contracts/repos/admin";
import type { AdminDto } from "../../dtos/admin";
import { AdminMapper } from "../../mappers/admin";

export class GetAllAdminsUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository
  ){}

  async execute(): Promise<AdminDto[]> {
    const admins = await this.adminRepo.getAll()

    return admins.map(AdminMapper.toDto)
  }
}