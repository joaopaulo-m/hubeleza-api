import type { IWalletRepository } from "../../contracts/repos/wallet";
import type { WalletDto } from "../../dtos/wallet";
import { WalletMapper } from "../../mappers/wallet";

export class GetWalletByPartnerIdUseCase {
  constructor(
    private readonly walletRepo: IWalletRepository
  ){}

  async execute(partner_id: string): Promise<Error | WalletDto> {
    const wallet = await this.walletRepo.findByPartnerId(partner_id)

    if (!wallet) {
      return new Error("Partner wallet not found")
    }

    return WalletMapper.toDto(wallet)
  }
}