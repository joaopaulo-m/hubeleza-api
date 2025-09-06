import type { State } from "../../../domain/enums/state";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { ITreatmentStatePriceRepository } from "../../contracts/repos/treatment-state-price";

export interface UpdateTreatmentStatePriceDto {
  treatment_state_price_id: string
  state?: State
  price?: number
}

export class UpdateTreatmentStatePriceUseCase {
  constructor(
    private readonly treatmentStatePriceRepo: ITreatmentStatePriceRepository,
    private readonly treatmentRepo: ITreatmentRepository
  ){}

  async execute(props: UpdateTreatmentStatePriceDto): Promise<Error | void> {
    const treatmentStatePrice = await this.treatmentStatePriceRepo.findById(props.treatment_state_price_id)

    if (!treatmentStatePrice) {
      return new Error("Treatment state price not found")
    }

    const treatment = await this.treatmentRepo.findById(treatmentStatePrice.treatment_id)
    
    if (!treatment) {
      return new Error("Treatment not found")
    }

    if (!props.state && !props.price) {
      return new Error("Not value found to update")
    }

    if (props.state) {
      if (treatment.state_prices.some(statePrice => statePrice.state === props.state)) {
        return new Error("State price already exists")
      }

      treatmentStatePrice.updateState(props.state)
    }

    if (props.price) {
      treatmentStatePrice.updatePrice(props.price)
    }

    await this.treatmentStatePriceRepo.update(treatmentStatePrice)
    return void 0;
  }
}