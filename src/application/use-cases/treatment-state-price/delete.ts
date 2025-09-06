import type { ITreatmentStatePriceRepository } from "../../contracts/repos/treatment-state-price";

export class DeleteTreatmentStatePriceUseCase {
  constructor(
    private readonly treatmentStatePriceRepo: ITreatmentStatePriceRepository
  ){}

  async execute(treatment_state_price_id: string): Promise<Error | void> {
    const treatmentStatePrice = await this.treatmentStatePriceRepo.findById(treatment_state_price_id)

    if (!treatmentStatePrice) {
      return new Error("Treatment state price not found")
    }

    await this.treatmentStatePriceRepo.delete(treatmentStatePrice.id)
    return void 0
  }
}