import type { IAffiliateRepository } from "../../contracts/repos/affiliate";

export class DeleteAffiliateUseCase {
  constructor(
    private readonly affiliateRepo: IAffiliateRepository
  ){}

  async execute(affiliate_id: string): Promise<Error | void> {
    const affiliate = await this.affiliateRepo.findById(affiliate_id)

    if (!affiliate) {
      return new Error("Affiliate not found")
    }

    await this.affiliateRepo.delete(affiliate.id)
    return void 0
  }
}