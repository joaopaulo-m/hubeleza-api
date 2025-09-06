import { TreatmentStatePrice } from "../../../domain/entities/treatment-state-price";
import type { State } from "../../../domain/enums/state";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { ITreatmentStatePriceRepository } from "../../contracts/repos/treatment-state-price";

export interface CreateTreatmentStatePriceDto {
  treatment_id: string
  state: State
  price: number
}

export class CreateTreatmentStatePriceUseCase {
  constructor(
    private readonly treatmentRepo: ITreatmentRepository,
    private readonly treatmentStatePriceRepo: ITreatmentStatePriceRepository
  ){}

  async execute(props: CreateTreatmentStatePriceDto): Promise<Error | void> {
    const treatment = await this.treatmentRepo.findById(props.treatment_id)

    if (!treatment) {
      return new Error("Treatment does not exists")
    }

    if (treatment.state_prices.some(price => price.state === props.state)) {
      return new Error("State price already exists")
    }

    const treatmentStatePrice = new TreatmentStatePrice({
      treatment_id: treatment.id,
      state: props.state,
      price: props.price,
    })
    await this.treatmentStatePriceRepo.create(treatmentStatePrice)

    return void 0;
  }
}