import type { Transaction } from "../../../domain/entities/transaction";

export interface ITransactionRepository {
  findById: (id: string) => Promise<null | Transaction>
  findByExternalId: (external_id: string) => Promise<null | Transaction>
  findByPartnerId: (partner_id: string) => Promise<Transaction[]>
  getTopDepositors(limit: number): Promise<{ partner_name: string, total_deposit: number }[]>
  create: (transaction: Transaction) => Promise<void>
  update: (transaction: Transaction) => Promise<void>
}