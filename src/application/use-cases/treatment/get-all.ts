import type { ITreatmentRepository } from "../../contracts/repos/treatment";
import type { TreatmentDto } from "../../dtos/treatment";
import { TreatmentMapper } from "../../mappers/treatment";

export interface FetchTreatmentsDto {
  name?: string
  category?: string
}

export class GetAllTreatmentsUseCase {
  constructor(
    private readonly treatmentRepo: ITreatmentRepository
  ){}

  async execute(props: FetchTreatmentsDto): Promise<TreatmentDto[]> {
    const treatments = await this.treatmentRepo.getAll(props)

    return treatments.map(TreatmentMapper.toDto)
  }
}