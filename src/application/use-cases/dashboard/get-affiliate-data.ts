import { TransactionType } from "../../../domain/enums/transaction-type"
import type { IAffiliateTransactionRepository } from "../../contracts/repos/affiliate-transaction"
import type { ILeadRepository } from "../../contracts/repos/lead"
import type { IPartnerRepository } from "../../contracts/repos/partner"

export interface AffiliateDashboardData {
  total_comission_amount: number
  total_leads: number
  total_partners: number
}

export class GetAffiliateDashboardDataUseCase {
  constructor(
    private readonly affiliateTransactionRepo: IAffiliateTransactionRepository,
    private readonly leadRepo: ILeadRepository,
    private readonly partnerRepo: IPartnerRepository
  ){}

  async execute(affiliate_id: string): Promise<AffiliateDashboardData> {
    const [
      totalComissionAmount,
      totalLeads,
      totalPartners
    ] = await Promise.all([
      this.affiliateTransactionRepo.countAllAmount({ affiliate_id, type: TransactionType.INCOME }),
      this.leadRepo.countByAffiliateId(affiliate_id),
      this.partnerRepo.countByAffiliate(affiliate_id)
    ]);

    return {
      total_comission_amount: totalComissionAmount,
      total_leads: totalLeads,
      total_partners: totalPartners
    }
  }
}