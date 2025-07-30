import type { ITreatmentRepository } from "../../contracts/repos/treatment";

export class DeleteTreatmentUseCase {
  constructor(
    private readonly treatmentRepo: ITreatmentRepository
  ){}

  async execute(treatment_id: string): Promise<Error | void> {
    const treatmentExists = await this.treatmentRepo.findById(treatment_id)

    if (!treatmentExists) {
      return new Error("Treatment does not exists")
    }

    await this.treatmentRepo.delete(treatment_id)
    return void 0;
  }
}