import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { PartnerDto } from "../../dtos/partner";
import { PartnerMapper } from "../../mappers/partner";

export class GetAllPartnersUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository
  ){}

  async execute(): Promise<PartnerDto[]> {
    const parnters = await this.partnerRepo.getAll()

    return parnters.map(PartnerMapper.toDto)
  }
}