import { Form } from "../../../domain/entities/form";
import type { IFormRepository } from "../../contracts/repos/form";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";

export interface CreateFormDto {
  external_form_id: string
  name: string
  treatment_ids: string[]
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

    const allTreatments = await this.treatmentRepo.getAll()

    if (!props.treatment_ids.some(treatmentId => allTreatments.map(t => t.id).includes(treatmentId))) {
      return new Error("Some treatment does not exists")
    }

    const form = new Form({
      external_form_id: props.external_form_id,
      name: props.name,
      treatments: props.treatment_ids.map(treatmentId => {
        const index = allTreatments.findIndex(treatment => treatment.id === treatmentId) as number

        return allTreatments[index]
      })
    })
    await this.formRepo.create(form)

    return void 0;
  }
}