import { AffiliateTransaction } from "../../domain/entities/affiliate-transaction"
import type { TransactionType } from "../../domain/enums/transaction-type"
import type { AffiliateTransactionDto } from "../dtos/affiliate-transaction"

export type PersistenceAffiliateTransaction = {
  id: string
  affiliate_wallet_id: string
  type: string
  amount: number
  created_at: bigint
  comission_percentage: number | null
  partner_id: string | null
}

export class AffiliateTransactionMapper {
  static toDomain(raw: PersistenceAffiliateTransaction): AffiliateTransaction {
    return new AffiliateTransaction({
      id: raw.id,
      affiliate_wallet_id: raw.affiliate_wallet_id,
      partner_id: raw.partner_id ? raw.partner_id : undefined,
      type: raw.type as TransactionType,
      amount: raw.amount,
      comission_percentage: raw.comission_percentage ? raw.comission_percentage : undefined,
      created_at: Number(raw.created_at)
    })
  }

  static toPersistence(domain: AffiliateTransaction): PersistenceAffiliateTransaction {
    return {
      id: domain.id,
      affiliate_wallet_id: domain.affiliate_wallet_id,
      partner_id: domain.partner_id ? domain.partner_id : null,
      type: domain.type,
      amount: domain.amount,
      comission_percentage: domain.comission_percentage ? domain.comission_percentage : null,
      created_at: BigInt(domain.created_at)
    }
  }

  static toDto(domain: AffiliateTransaction): AffiliateTransactionDto {
    return {
      id: domain.id,
      affiliate_wallet_id: domain.affiliate_wallet_id,
      partner_id: domain.partner_id,
      type: domain.type,
      amount: domain.amount,
      comission_percentage: domain.comission_percentage,
      created_at: domain.created_at
    }
  }
}