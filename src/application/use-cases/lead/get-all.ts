import type { ILeadRepository } from "../../contracts/repos/lead";
import type { LeadDto } from "../../dtos/lead";
import { LeadMapper } from "../../mappers/lead";

export class GetAllLeadsUseCase {
  constructor(
    private readonly leadRepo: ILeadRepository,
  ){}

  async execute(): Promise<LeadDto[]> {
    const leads = await this.leadRepo.getAll();

    return leads.map(LeadMapper.toDto)
  }
}