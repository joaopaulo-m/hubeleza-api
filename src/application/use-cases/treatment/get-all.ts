import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { TreatmentDto } from "../../dtos/treatment";
import { TreatmentMapper } from "../../mappers/treatment";

export class GetAllTreatmentsUseCase {
  constructor(
    private readonly treatmentRepo: ITreatmentRepository
  ){}

  async execute(): Promise<TreatmentDto[]> {
    const treatments = await this.treatmentRepo.getAll()

    return treatments.map(TreatmentMapper.toDto)
  }
}