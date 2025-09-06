import type { PartnerStatus } from "../../../domain/enums/partner-status";
import type { IPartnerRepository } from "../../contracts/repos/partner";

export interface UpdatePartnerStatusDto {
  partner_id: string
  status: PartnerStatus
}

export class UpdatePartnerStatusUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository
  ){}

  async execute(props: UpdatePartnerStatusDto): Promise<Error | void> {
    const partner = await this.partnerRepo.findById(props.partner_id)

    if (!partner) {
      return new Error("Partner not found")
    }

    partner.updateStatus(props.status)
    await this.partnerRepo.update(partner)
    
    return void 0;
  }
}