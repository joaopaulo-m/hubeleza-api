import { Treatment } from "../../../domain/entities/treatment";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";

export interface CreateTreatmentDto {
  name: string
  price: number
}

export class CreateTreatmentUseCase {
  constructor(
    private readonly treatmentRepo: ITreatmentRepository
  ) {}

  async execute(props: CreateTreatmentDto): Promise<Error | void> {
    const treatmentAlreadyExists = await this.treatmentRepo.findByName(props.name)

    if (treatmentAlreadyExists) {
      return new Error("Treatment already exists")
    }

    const treatment = new Treatment({
      name: props.name,
      price: props.price
    })

    await this.treatmentRepo.create(treatment)

    return void 0;
  }
}