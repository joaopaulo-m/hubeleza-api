import { Form } from "../../../domain/entities/form";
import type { IFormRepository } from "../../contracts/repos/form";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";

export interface CreateFormDto {
  external_form_id: string
  treatment_id: string
  name: string
}

export class CreateFormUseCase {
  constructor(
    private readonly formRepo: IFormRepository,
    private readonly treatmentRepo: ITreatmentRepository
  ) {}

  async execute(props: CreateFormDto): Promise<Error | void> {
    const formAlreadyExists = await this.formRepo.findByExternalId(props.external_form_id)

    if (formAlreadyExists) {
      return new Error("Form already exists")
    }

    const treatmentExists = await this.treatmentRepo.findById(props.treatment_id)

    if (!treatmentExists) {
      return new Error("Treatment does not exists")
    }

    const form = new Form({
      external_form_id: props.external_form_id,
      treatment_id: treatmentExists.id,
      name: props.name
    })
    await this.formRepo.create(form)

    return void 0;
  }
}