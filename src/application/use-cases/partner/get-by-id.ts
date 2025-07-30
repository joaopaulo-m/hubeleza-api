import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { PartnerDto } from "../../dtos/partner";
import { PartnerMapper } from "../../mappers/partner";

export class GetPartnerByIdUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository
  ){}

  async execute(partner_id: string): Promise<Error | PartnerDto> {
    const partner = await this.partnerRepo.findById(partner_id)

    if (!partner) {
      return new Error("Partner does not exists")
    }

    return PartnerMapper.toDto(partner)
  }
}