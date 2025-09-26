import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { PartnerDto } from "../../dtos/partner";
import { PartnerMapper } from "../../mappers/partner";

export interface FetchPartersDto {
  affiliate_id?: string
  name?: string
  city?: string
  state?: string
  status?: string
  start_date?: number
  end_date?: number
  treatment_ids?: string[]
}

export class GetAllPartnersUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository
  ){}

  async execute(props: FetchPartersDto): Promise<PartnerDto[]> {
    const parnters = await this.partnerRepo.getAll(props)

    return parnters.map(PartnerMapper.toDto)
  }
}