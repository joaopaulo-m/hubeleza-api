import type { IFormRepository } from "../../contracts/repos/form";
import type { FormDto } from "../../dtos/form";
import { FormMapper } from "../../mappers/form";

export class GetAllFormsUseCase {
  constructor(
    private readonly formRepo: IFormRepository
  ){}

  async execute(): Promise<FormDto[]> {
    const forms = await this.formRepo.getAll()

    return forms.map(FormMapper.toDto)
  }
}