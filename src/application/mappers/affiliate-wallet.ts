import { AffiliateWallet } from "../../domain/entities/affiliate-wallet"
import type { AffiliateWalletDto } from "../dtos/affiliate-wallet"

export type PersistenceAffiliateWallet = {
  id: string
  affiliate_id: string
  document: string
  balance: number
}

export class AffiliateWalletMapper {
  static toDomain(raw: PersistenceAffiliateWallet): AffiliateWallet {
    return new AffiliateWallet({
      id: raw.id,
      affiliate_id: raw.affiliate_id,
      document: raw.document,
      balance: raw.balance
    })
  }

  static toPersistence(domain: AffiliateWallet): PersistenceAffiliateWallet {
    return {
      id: domain.id,
      affiliate_id: domain.affiliate_id,
      document: domain.document,
      balance: domain.balance
    }
  }

  static toDto(domain: AffiliateWallet): AffiliateWalletDto {
    return {
      id: domain.id,
      affiliate_id: domain.affiliate_id,
      document: domain.document,
      balance: domain.balance
    }
  }
}