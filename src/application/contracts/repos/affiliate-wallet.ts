import type { AffiliateWallet } from "../../../domain/entities/affiliate-wallet";

export interface IAffiliateWalletRepository {
  findByAffiliateId: (affiliate_id: string) => Promise<AffiliateWallet | null>
  create: (affiliateWallet: AffiliateWallet) => Promise<void>
  update: (affiliateWallet: AffiliateWallet) => Promise<void>
}