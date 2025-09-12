import type { Transaction } from "../../../domain/entities/transaction";
import type { TransactionStatus } from "../../../domain/enums/transaction-status";
import type { TransactionType } from "../../../domain/enums/transaction-type";
import type { GetTransactionsDto } from "../../use-cases/transaction/get-all";

export interface ITransactionRepository {
  findById: (id: string) => Promise<null | Transaction>
  findByExternalId: (external_id: string) => Promise<null | Transaction>
  findByPartnerId: (partner_id: string) => Promise<Transaction[]>
  getAll: (props: GetTransactionsDto) => Promise<Transaction[]>
  getTopDepositors(limit: number): Promise<{ partner_name: string, total_deposit: number }[]>
  countAll(props?: { startDate?: number, endDate?: number }): Promise<number>
  sumAmount(props?: { startDate?: number, endDate?: number }): Promise<number>
  sumByType(type: TransactionType, props?: { startDate?: number, endDate?: number }): Promise<number>
  countByStatus(status: TransactionStatus, props?: { startDate?: number, endDate?: number }): Promise<number>
  getMonthlyGrowth(): Promise<number>
  create: (transaction: Transaction) => Promise<void>
  update: (transaction: Transaction) => Promise<void>
}