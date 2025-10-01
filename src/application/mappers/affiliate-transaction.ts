import { AffiliateTransaction } from "../../domain/entities/affiliate-transaction"
import type { TransactionType } from "../../domain/enums/transaction-type"
import { Decimal } from "../../generated/prisma/runtime/library"
import type { AffiliateTransactionDto } from "../dtos/affiliate-transaction"

export type PersistenceAffiliateTransaction = {
  id: string
  affiliate_wallet_id: string
  type: string
  amount: number
  created_at: bigint
  comission_percentage: Decimal | null
  partner_id: string | null
  lead_id: string | null
  lead_price: number | null
  lead_comission_amount: number | null
}

export class AffiliateTransactionMapper {
  static toDomain(raw: PersistenceAffiliateTransaction): AffiliateTransaction {
    return new AffiliateTransaction({
      id: raw.id,
      affiliate_wallet_id: raw.affiliate_wallet_id,
      partner_id: raw.partner_id ? raw.partner_id : undefined,
      lead_id: raw.lead_id ? raw.lead_id : undefined,
      lead_price: raw.lead_price ? raw.lead_price : undefined,
      lead_comission_amount: raw.lead_comission_amount ? raw.lead_comission_amount : undefined,
      type: raw.type as TransactionType,
      amount: raw.amount,
      comission_percentage: raw.comission_percentage ? raw.comission_percentage.toNumber() : undefined,
      created_at: Number(raw.created_at)
    })
  }

  static toPersistence(domain: AffiliateTransaction): PersistenceAffiliateTransaction {
    return {
      id: domain.id,
      affiliate_wallet_id: domain.affiliate_wallet_id,
      partner_id: domain.partner_id ? domain.partner_id : null,
      lead_id: domain.lead_id ? domain.lead_id : null,
      lead_price: domain.lead_price ? domain.lead_price : null,
      lead_comission_amount: domain.lead_comission_amount ? domain.lead_comission_amount : null,
      type: domain.type,
      amount: domain.amount,
      comission_percentage: domain.comission_percentage ? Decimal(domain.comission_percentage) : null,
      created_at: BigInt(domain.created_at)
    }
  }

  static toDto(domain: AffiliateTransaction): AffiliateTransactionDto {
    return {
      id: domain.id,
      affiliate_wallet_id: domain.affiliate_wallet_id,
      partner_id: domain.partner_id,
      lead_id: domain.lead_id,
      lead_price: domain.lead_price,
      lead_comission_amount: domain.lead_comission_amount,
      type: domain.type,
      amount: domain.amount,
      comission_percentage: domain.comission_percentage,
      created_at: domain.created_at
    }
  }
}