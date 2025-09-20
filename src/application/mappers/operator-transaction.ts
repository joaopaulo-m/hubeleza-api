import { OperatorTransaction } from "../../domain/entities/operator-transaction"
import type { TransactionType } from "../../domain/enums/transaction-type"
import { Decimal } from "../../generated/prisma/runtime/library"
import type { ComissionType } from "../../shared/enums/comission-type"
import type { OperatorTransactionDto } from "../dtos/operator-transaction"

export type PersistenceOperatorTransaction = {
  id: string
  operator_wallet_id: string
  type: string
  amount: number
  created_at: bigint
  external_id: string | null
  comission_percentage: Decimal | null
  comission_type: string | null
  partner_id: string | null
}

export class OperatorTransactionMapper {
  static toDomain(raw: PersistenceOperatorTransaction): OperatorTransaction {
    return new OperatorTransaction({
      id: raw.id,
      operator_wallet_id: raw.operator_wallet_id,
      type: raw.type as TransactionType,
      amount: raw.amount,
      created_at: raw.created_at ? Number(raw.created_at) : undefined,
      external_id: raw.external_id ? raw.external_id : undefined,
      comission_percentage: raw.comission_percentage ? raw.comission_percentage.toNumber() : undefined,
      comission_type: raw.comission_type ? raw.comission_type as ComissionType : undefined,
      partner_id: raw.partner_id ? raw.partner_id : undefined
    })
  }

  static toPersistence(domain: OperatorTransaction): PersistenceOperatorTransaction {
    return {
      id: domain.id,
      operator_wallet_id: domain.operator_wallet_id,
      type: domain.type,
      amount: domain.amount,
      created_at: BigInt(domain.created_at),
      external_id: domain.external_id ? domain.external_id : null,
      comission_percentage: domain.comission_percentage ? Decimal(domain.comission_percentage) : null,
      comission_type: domain.comission_type ? domain.comission_type : null,
      partner_id: domain.partner_id ? domain.partner_id : null
    }
  }

  static toDto(domain: OperatorTransaction): OperatorTransactionDto {
    return {
      id: domain.id,
      operator_wallet_id: domain.operator_wallet_id,
      type: domain.type,
      amount: domain.amount,
      created_at: domain.created_at,
      external_id: domain.external_id,
      comission_percentage: domain.comission_percentage,
      comission_type: domain.comission_type
    }
  }
}