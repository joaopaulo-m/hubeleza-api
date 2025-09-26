import type { IAffiliateWalletRepository } from "../../contracts/repos/affiliate-wallet";
import type { AffiliateWalletDto } from "../../dtos/affiliate-wallet";
import { AffiliateWalletMapper } from "../../mappers/affiliate-wallet";

export class GetAffiliateWalletByAffiliateIdUseCase {
  constructor(
    private readonly affiliateWalletRepo: IAffiliateWalletRepository
  ) {}

  async execute(affiliate_id: string): Promise<Error | AffiliateWalletDto> {
    const wallet = await this.affiliateWalletRepo.findByAffiliateId(affiliate_id)

    if (!wallet) {
      return new Error("Wallet not found")
    }

    return AffiliateWalletMapper.toDto(wallet)
  }
}