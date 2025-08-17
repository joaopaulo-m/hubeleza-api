import type { IAdminRepository } from "../../contracts/repos/admin";
import type { AdminDto } from "../../dtos/admin";
import { AdminMapper } from "../../mappers/admin";

export class FindAdminByIdUseCase {
  constructor(
    private readonly adminRepo: IAdminRepository
  ){}

  async execute(admin_id: string): Promise<Error | AdminDto> {
    const admin = await this.adminRepo.findById(admin_id)

    if (!admin) {
      return new Error("Admin not found")
    }

    return AdminMapper.toDto(admin)
  }
}