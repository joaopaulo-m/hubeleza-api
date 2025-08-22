import type { ILeadRepository } from "../../contracts/repos/lead";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { ITransactionRepository } from "../../contracts/repos/transaction";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IWalletRepository } from "../../contracts/repos/wallet";
import type { IPaymentService } from "../../contracts/services/payment";

export interface AdminDashboardData {
  total_wallet_balance: number
  total_payment_gateway_balance: number
  total_partners: number
  total_leads_sent: number
  top_treatments: { name: string, total_leads: number }[]
  top_partners_by_leads: { partner_name: string, total_leads: number }[]
  top_partners_by_deposit: { partner_name: string, total_deposit: number }[]
}


export class GetAdminDashboardDataUseCase {
  constructor(
    private readonly walletRepo: IWalletRepository,
    private readonly partnerRepo: IPartnerRepository,
    private readonly leadRepo: ILeadRepository,
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly transactionRepo: ITransactionRepository,
    private readonly paymentService: IPaymentService
  ) {}

  async execute(): Promise<AdminDashboardData> {
    const [
      totalWalletBalance,
      totalPaymentGatewayBalance,
      totalPartners,
      totalLeadsSent,
      topTreatments,
      topPartnersByLeads,
      topPartnersByDeposit
    ] = await Promise.all([
      this.walletRepo.getTotalBalance(),
      this.paymentService.getTotalBalance(),
      this.partnerRepo.countAll(),
      this.leadRepo.countAllDispatches(),
      this.treatmentRepo.getTopTreatmentsByLeadCount(10),
      this.partnerRepo.getTopPartnersByLeadCount(10),
      this.transactionRepo.getTopDepositors(10)
    ]);

    return {
      total_wallet_balance: totalWalletBalance,
      total_payment_gateway_balance: totalPaymentGatewayBalance * 100,
      total_partners: totalPartners,
      total_leads_sent: totalLeadsSent,
      top_treatments: topTreatments,
      top_partners_by_leads: topPartnersByLeads,
      top_partners_by_deposit: topPartnersByDeposit
    };
  }
}
