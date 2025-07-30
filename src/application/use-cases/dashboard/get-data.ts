import type { IFormRepository } from "../../contracts/repos/form";
import type { ILeadRepository, RecentLead } from "../../contracts/repos/lead";
import type { IPartnerRepository } from "../../contracts/repos/partner";
import type { ITreatmentRepository, TreatmentPerformance } from "../../contracts/repos/treatment";

export interface GetDashboardDataDto {
  total_leads: number
  active_partners: number
  total_forms: number
  conversion_rate: number
  recent_leads: RecentLead[]
  treatment_performance: TreatmentPerformance[]
}

export class GetDashboardDataUseCase {
  constructor(
    private readonly leadRepo: ILeadRepository,
    private readonly partnerRepo: IPartnerRepository,
    private readonly formRepo: IFormRepository,
    private readonly treatmentRepo: ITreatmentRepository
  ){}

  async execute() {
    const [
      totalLeads,
      convertedLeads,
      activePartners,
      totalForms,
      recentLeads,
      treatmentPerformance
    ] = await Promise.all([
      this.leadRepo.countAll(),
      this.leadRepo.countConverted(),
      this.partnerRepo.countActive(),
      this.formRepo.countAll(),
      this.leadRepo.findRecentLeads(5),
      this.treatmentRepo.getTreatmentPerformance()
    ])

    const conversionRate = totalLeads === 0 ? 0 : (convertedLeads / totalLeads) * 100

    return {
      total_leads: totalLeads,
      active_partners: activePartners,
      total_forms: totalForms,
      conversion_rate: parseFloat(conversionRate.toFixed(1)),
      recent_leads: recentLeads,
      treatment_performance: treatmentPerformance
    }
  }
}