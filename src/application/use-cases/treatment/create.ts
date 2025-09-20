import { randomUUID } from "node:crypto";
import { Treatment } from "../../../domain/entities/treatment";
import { TreatmentStatePrice } from "../../../domain/entities/treatment-state-price";
import type { State } from "../../../domain/enums/state";
import { TreatmentCategory } from "../../../domain/enums/treatment-category";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";

export interface CreateTreatmentDto {
  name: string
  price: number
  category: TreatmentCategory
  state_prices: { state: State, price: number }[]
}

export class CreateTreatmentUseCase {
  constructor(
    private readonly treatmentRepo: ITreatmentRepository
  ) {}

  async execute(props: CreateTreatmentDto): Promise<Error | void> {
    if (
      props.category !== TreatmentCategory.BODY &&
      props.category !== TreatmentCategory.FACIAL &&
      props.category !== TreatmentCategory.HAIR_REMOVAL &&
      props.category !== TreatmentCategory.HAIR &&
      props.category !== TreatmentCategory.WELLNESS
    ) {
      return new Error("Invalid category")
    }

    const treatment_id = randomUUID()
    const treatment = new Treatment({
      id: treatment_id,
      name: props.name,
      price: props.price,
      category: props.category,
      state_prices: props.state_prices && props.state_prices.length > 0 ? props.state_prices.map(price => {
        return new TreatmentStatePrice({
          treatment_id,
          state: price.state,
          price: price.price,
        })
      }) : []
    })

    await this.treatmentRepo.create(treatment)

    return void 0;
  }
}