import type { IFormRepository } from "../../contracts/repos/form";
import type { ILeadRepository } from "../../contracts/repos/lead";
import type { IPartnerRepository } from "../../contracts/repos/partner";

export interface GetTreatmentDataDto {
  form_count: number
  partner_count: number
  lead_count: number
}

export class GetTreatmentDataUseCase {
  constructor(
    private readonly formRepo: IFormRepository,
    private readonly partnerRepo: IPartnerRepository,
    private readonly leadRepo: ILeadRepository,
  ){}

  async execute(treatment_id: string): Promise<GetTreatmentDataDto> {
    const formCount = await this.formRepo.countByTreatment(treatment_id)
    const partnerCount = await this.partnerRepo.countByTreatment(treatment_id)
    const leadCount = await this.leadRepo.countByTreatment(treatment_id)

    return {
      form_count: formCount,
      partner_count: partnerCount,
      lead_count: leadCount
    }
  }
}