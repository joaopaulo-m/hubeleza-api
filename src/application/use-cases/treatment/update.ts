import type { ITreatmentRepository } from "../../contracts/repos/treatment";

export interface UpdateTreatmentDto {
  id: string
  name: string
}

export class UpdateTreatmentUseCase {
  constructor(
    private readonly treatmentRepo: ITreatmentRepository
  ){}

  async execute(props: UpdateTreatmentDto): Promise<Error | void> {
    const treatmentExists = await this.treatmentRepo.findById(props.id)

    if (!treatmentExists) {
      return new Error("Treatment not found")
    }

    const treatmentNameAlreadyExists = await this.treatmentRepo.findByName(props.name)
    
    if (treatmentNameAlreadyExists) {
      return new Error(`Treatment with name '${props.name}' already exists.`)
    }

    treatmentExists.updateName(props.name)
    await this.treatmentRepo.update(treatmentExists)

    return void 0;
  }
}