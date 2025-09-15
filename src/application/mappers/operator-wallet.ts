import { OperatorWallet } from "../../domain/entities/operator-wallet"
import type { OperatorWalletDto } from "../dtos/operator-wallet"
import { OperatorTransactionMapper, type PersistenceOperatorTransaction } from "./operator-transaction"

export type PersistenceOperatorWallet = {
  id: string
  operator_id: string
  document: string
  balance: number
  external_id: string | null
  transactions: PersistenceOperatorTransaction[]
}

export class OperatorWalletMapper {
  static toDomain(raw: PersistenceOperatorWallet): OperatorWallet {
    return new OperatorWallet({
      id: raw.id,
      operator_id: raw.operator_id,
      document: raw.document,
      balance: raw.balance,
      external_id: raw.external_id ? raw.external_id : undefined,
      transactions: raw.transactions.map(OperatorTransactionMapper.toDomain)
    })
  }

  static toPersistence(domain: OperatorWallet): PersistenceOperatorWallet {
    return {
      id: domain.id,
      operator_id: domain.operator_id,
      document: domain.document,
      balance: domain.balance,
      external_id: domain.external_id ? domain.external_id : null,
      transactions: domain.transactions.map(OperatorTransactionMapper.toPersistence)
    }
  }

  static toDto(domain: OperatorWallet): OperatorWalletDto {
    return {
      id: domain.id,
      operator_id: domain.operator_id,
      document: domain.document,
      balance: domain.balance,
      external_id: domain.external_id,
      transactions: domain.transactions.map(OperatorTransactionMapper.toDto),
    }
  }
}