import { TransactionType } from "../../../domain/enums/transaction-type"
import type { IAffiliateTransactionRepository } from "../../contracts/repos/affiliate-transaction"
import type { IPartnerRepository } from "../../contracts/repos/partner"

export interface AffiliateDashboardData {
  total_comission_amount: number
  total_withdraw_amount: number
  total_partners: number
}

export class GetAffiliateDashboardDataUseCase {
  constructor(
    private readonly affiliateTransactionRepo: IAffiliateTransactionRepository,
    private readonly partnerRepo: IPartnerRepository
  ){}

  async execute(affiliate_id: string): Promise<AffiliateDashboardData> {
    const [
      totalComissionAmount,
      totalWithdrawAmount,
      totalPartners
    ] = await Promise.all([
      this.affiliateTransactionRepo.countAllAmount({ affiliate_id, type: TransactionType.INCOME }),
      this.affiliateTransactionRepo.countAllAmount({ affiliate_id, type: TransactionType.EXPENSE }),
      this.partnerRepo.countByAffiliate(affiliate_id)
    ]);

    return {
      total_comission_amount: totalComissionAmount,
      total_withdraw_amount: totalWithdrawAmount,
      total_partners: totalPartners
    }
  }
}