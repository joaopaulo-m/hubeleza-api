import type { IPartnerRepository } from "../../contracts/repos/partner";

export class DeletePartnerUseCase {
  constructor(
    private readonly partnerRepo: IPartnerRepository
  ){}

  async execute(partner_id: string): Promise<Error | void> {
    const partnerExists = await this.partnerRepo.findById(partner_id)

    if (!partnerExists) {
      return new Error("Partner does not exists")
    }

    await this.partnerRepo.delete(partner_id)
    return void 0;
  }
}