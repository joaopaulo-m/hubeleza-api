import type { AffiliateStatus } from "../../../domain/enums/affiliate-status"
import type { IAffiliateRepository } from "../../contracts/repos/affiliate"
import type { AffiliateDto } from "../../dtos/affiliate"
import { AffiliateMapper } from "../../mappers/affiliate"

export interface FetchAffiliatesDto {
  name?: string
  status?: AffiliateStatus
  referral_code?: string
}

export class GetAffiliatesUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository
  ){}

  async execute(props: FetchAffiliatesDto): Promise<AffiliateDto[]> {
    const affiliates = await this.affiliateRepo.getAll(props)

    return affiliates.map(AffiliateMapper.toDto)
  }
}