import type { ILeadRepository } from "../../contracts/repos/lead";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { IWalletRepository } from "../../contracts/repos/wallet";

export interface PartnerDashboardData {
  total_leads: number
  total_treatments: number
  leads_per_treatment: { treatment: string, count: number }[]
}

export class GetPartnerDashboardDataUseCase {
  constructor(
    private readonly leadRepo: ILeadRepository,
    private readonly treatmentRepo: ITreatmentRepository,
  ) {}

  async execute(partner_id: string): Promise<PartnerDashboardData> {
    const [
      totalLeads,
      leadsPerTreatment,
      treatments
    ] = await Promise.all([
      this.leadRepo.countByPartnerId(partner_id),
      this.leadRepo.countByPartnerPerTreatment(partner_id),
      this.treatmentRepo.countByPartnerId(partner_id)
    ]);

    return {
      total_leads: totalLeads,
      leads_per_treatment: leadsPerTreatment,
      total_treatments: treatments
    }
  }
}
