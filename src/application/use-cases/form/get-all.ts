import type { IFormRepository } from "../../contracts/repos/form";
import type { FormDto } from "../../dtos/form";
import { FormMapper } from "../../mappers/form";

export interface GetAllFormsDto {
  name?: string
  treatment_ids?: string[]
}

export class GetAllFormsUseCase {
  constructor(
    private readonly formRepo: IFormRepository
  ){}

  async execute(props: GetAllFormsDto): Promise<FormDto[]> {
    const forms = await this.formRepo.getAll({
      ...props
    })

    return forms.map(FormMapper.toDto)
  }
}