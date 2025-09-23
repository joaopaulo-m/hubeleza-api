import type { IAffiliateRepository } from "../../contracts/repos/affiliate";
import type { AffiliateDto } from "../../dtos/affiliate";
import { AffiliateMapper } from "../../mappers/affiliate";

export class GetAffiliateByIdUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository
  ){}

  async execute(affiliate_id: string): Promise<Error | AffiliateDto> {
    const affiliate = await this.affiliateRepo.findById(affiliate_id)

    if (!affiliate) {
      return new Error("Affiliate not found")
    }

    return AffiliateMapper.toDto(affiliate)
  }
}