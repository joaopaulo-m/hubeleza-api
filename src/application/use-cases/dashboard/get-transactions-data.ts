import { TransactionStatus } from "../../../domain/enums/transaction-status"
import { TransactionType } from "../../../domain/enums/transaction-type"
import type { ITransactionRepository } from "../../contracts/repos/transaction"

export interface GetTransactionsDashboardDataDto {
  startDate?: number
  endDate?: number
}

export interface GetTransactionDashboardDataReturn {
  total_transactions: number
  total_amount: number
  total_credit: number
  total_debit: number
  monthly_growth: number
  pending_transactions: number,
  completed_transactions: number
  failed_transactions: number
}

export class GetTransactionsDashboardDataUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository
  ) {}

  async execute({ startDate, endDate }: GetTransactionsDashboardDataDto): Promise<GetTransactionDashboardDataReturn> {
    const [
      totalTransactions,
      totalAmount,
      totalCredit,
      totalDebit,
      pendingTransactions,
      completedTransactions,
      failedTransactions,
      monthlyGrowth
    ] = await Promise.all([
      this.transactionRepo.countAll({ startDate, endDate }),
      this.transactionRepo.sumAmount({ startDate, endDate }),
      this.transactionRepo.sumByType(TransactionType.INCOME, { startDate, endDate }),
      this.transactionRepo.sumByType(TransactionType.EXPENSE, { startDate, endDate }),
      this.transactionRepo.countByStatus(TransactionStatus.PENDING_PAYMENT, { startDate, endDate }),
      this.transactionRepo.countByStatus(TransactionStatus.PAID, { startDate, endDate }),
      this.transactionRepo.countByStatus(TransactionStatus.PENDING_RECEIPT, { startDate, endDate }),
      this.transactionRepo.getMonthlyGrowth()
    ])

    return {
      total_transactions: totalTransactions,
      total_amount: totalAmount,
      total_credit: totalCredit,
      total_debit: totalDebit,
      monthly_growth: parseFloat(monthlyGrowth.toFixed(2)),
      pending_transactions: pendingTransactions,
      completed_transactions: completedTransactions,
      failed_transactions: failedTransactions
    }
  }
}
