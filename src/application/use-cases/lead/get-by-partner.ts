import type { ILeadRepository } from "../../contracts/repos/lead";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { LeadDto } from "../../dtos/lead";
import { LeadMapper } from "../../mappers/lead";

export interface GetPartnerLeadsDto {
  partner_id: string
  page: number
  name?: string
  treatment_ids?: string[]
  start_date?: number
  end_date?: number
}
export interface GetPartnerLeadsReturn {
  data: LeadDto[]
  total: number
  total_pages: number
}

export class GetPartnerLeadsUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository,
    private readonly leadRepo: ILeadRepository
  ){}

  async execute(props: GetPartnerLeadsDto): Promise<Error | GetPartnerLeadsReturn> {
    const partner = await this.partnerRepo.findById(props.partner_id)

    if (!partner) {
      return new Error("Partner does not exists")
    }

    const { items, total } = await this.leadRepo.getAllByPartnerId(props.partner_id, {
      page: props.page,
      name: props.name,
      treatment_ids: props.treatment_ids,
      start_date: props.start_date,
      end_date: props.end_date
    })
    return {
      data: items.map(LeadMapper.toDto),
      total,
      total_pages: Math.round((total / 20))
    }
  }
}