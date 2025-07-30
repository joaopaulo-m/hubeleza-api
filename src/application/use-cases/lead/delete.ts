import type { ILeadRepository } from "../../contracts/repos/lead";

export class DeleteLeadUseCase {
  constructor(
    private readonly leadRepo: ILeadRepository
  ){}

  async execute(lead_id: string): Promise<Error | void> {
    const leadExists = await this.leadRepo.findById(lead_id);

    if (!leadExists) {
      return new Error("Lead does not exist");
    }

    await this.leadRepo.delete(lead_id);
    return void 0;
  }
}