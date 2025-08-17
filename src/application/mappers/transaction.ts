import { Transaction } from "../../domain/entities/transaction"
import type { TransactionType } from "../../domain/enums/transaction-type"
import type { TransactionDto } from "../dtos/transaction"
import { LeadMapper, type PersistenceLead } from "./lead"

export type PersistenceTransaction = {
  id: string
  wallet_id: string
  type: string
  amount: number
  lead_price: number
  created_at: bigint
  lead?: PersistenceLead
}

export class TransactionMapper {
  static toDomain(raw: PersistenceTransaction): Transaction {
    return new Transaction({
      id: raw.id,
      wallet_id: raw.wallet_id,
      type: raw.type as TransactionType,
      amount: raw.amount,
      lead_price: raw.lead_price,
      created_at: Number(raw.created_at),
      lead: raw.lead ? LeadMapper.toDomain(raw.lead) : undefined
    })
  }

  static toPersistence(domain: Transaction): PersistenceTransaction {
    return {
      id: domain.id,
      wallet_id: domain.wallet_id,
      type: domain.type,
      amount: domain.amount,
      lead_price: domain.lead_price,
      created_at: BigInt(domain.created_at),
      lead: domain.lead ? LeadMapper.toPersistence(domain.lead) : undefined,
    }
  }

  static toDto(domain: Transaction): TransactionDto {
    return {
      id: domain.id,
      wallet_id: domain.wallet_id,
      type: domain.type,
      amount: domain.amount,
      lead_price: domain.lead_price,
      created_at: domain.created_at,
      lead: domain.lead ? LeadMapper.toDto(domain.lead) : undefined,
    }
  }
}