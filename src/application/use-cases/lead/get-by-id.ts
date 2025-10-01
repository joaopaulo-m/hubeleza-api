import type { ILeadRepository } from "../../contracts/repos/lead";
import type { LeadDto } from "../../dtos/lead";
import { LeadMapper } from "../../mappers/lead";

export class GetLeadByIdUseCase {
  constructor(
    private readonly leadRepo: ILeadRepository,
  ){}

  async execute(lead_id: string): Promise<Error | LeadDto> {
    const lead = await this.leadRepo.findById(lead_id)

    if (!lead) {
      return new Error("Lead not found")
    }

    return LeadMapper.toDto(lead)
  }
}