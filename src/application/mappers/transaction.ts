import { Transaction } from "../../domain/entities/transaction"
import type { TransactionStatus } from "../../domain/enums/transaction-status"
import type { TransactionType } from "../../domain/enums/transaction-type"
import type { TransactionDto } from "../dtos/transaction"
import { LeadMapper, type PersistenceLead } from "./lead"

export type PersistenceTransaction = {
  id: string
  wallet_id: string
  status: string
  type: string
  amount: number
  created_at: bigint
  external_id: string | null
  lead_price: number | null
  lead: PersistenceLead | null
  bonus_amount: number | null
}

export class TransactionMapper {
  static toDomain(raw: PersistenceTransaction): Transaction {
    return new Transaction({
      id: raw.id,
      wallet_id: raw.wallet_id,
      external_id: raw.external_id ? raw.external_id : undefined,
      status: raw.status as TransactionStatus,
      type: raw.type as TransactionType,
      amount: raw.amount,
      created_at: Number(raw.created_at),
      lead_price: raw.lead_price ? raw.lead_price : undefined,
      lead: raw.lead ? LeadMapper.toDomain(raw.lead) : undefined,
      bonus_amount: raw.bonus_amount || undefined,
    })
  }

  static toPersistence(domain: Transaction): PersistenceTransaction {
    return {
      id: domain.id,
      wallet_id: domain.wallet_id,
      external_id: domain.external_id || null,
      status: domain.status,
      type: domain.type,
      amount: domain.amount,
      created_at: BigInt(domain.created_at),
      lead_price: domain.lead_price || null,
      lead: domain.lead ? LeadMapper.toPersistence(domain.lead) : null,
      bonus_amount: domain.bonus_amount ? domain.bonus_amount : null
    }
  }

  static toDto(domain: Transaction): TransactionDto {
    return {
      id: domain.id,
      wallet_id: domain.wallet_id,
      status: domain.status,
      type: domain.type,
      amount: domain.amount,
      lead_price: domain.lead_price,
      created_at: domain.created_at,
      lead: domain.lead ? LeadMapper.toDto(domain.lead) : undefined,
      bonus_amount: domain.bonus_amount
    }
  }
}