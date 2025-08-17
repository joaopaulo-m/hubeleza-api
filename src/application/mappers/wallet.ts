import { Wallet } from "../../domain/entities/wallet"
import type { WalletDto } from "../dtos/wallet"
import { TransactionMapper, type PersistenceTransaction } from "./transaction"

export type PersistenceWallet = {
  id: string
  partner_id: string
  balance: number
  transactions: PersistenceTransaction[]
}

export class WalletMapper {
  static toDomain(raw: PersistenceWallet): Wallet {
    return new Wallet({
      id: raw.id,
      partner_id: raw.partner_id,
      balance: raw.balance,
      transactions: raw.transactions.map(TransactionMapper.toDomain)
    })
  }

  static toPersistence(domain: Wallet): PersistenceWallet {
    return {
      id: domain.id,
      partner_id: domain.partner_id,
      balance: domain.balance,
      transactions: domain.transactions.map(TransactionMapper.toPersistence)
    }
  }

  static toDto(domain: Wallet): WalletDto {
    return {
      id: domain.id,
      partner_id: domain.partner_id,
      balance: domain.balance,
      transactions: domain.transactions.map(TransactionMapper.toDto)
    }
  }
}