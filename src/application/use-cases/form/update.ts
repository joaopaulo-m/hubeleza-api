import type { IFormRepository } from "../../contracts/repos/form";
import type { ITreatmentRepository } from "../../contracts/repos/treatment";

export interface UpdateFormDto {
  form_id: string
  name?: string
  external_form_id?: string
  treatment_ids?: string[]
}

export class UpdateFormUseCase {
  constructor(
    private readonly formRepo: IFormRepository,
    private readonly treatmentRepo: ITreatmentRepository
  ){}

  async execute(props: UpdateFormDto): Promise<Error | void> {
    const formExists = await this.formRepo.findById(props.form_id)

    if (!formExists) {
      return new Error("Form does not exists")
    }

    if (props.name) {
      formExists.updateName(props.name)
    }

    if (props.external_form_id) {
      const externalIdFormAlreadyExists = await this.formRepo.findByExternalId(props.external_form_id)

      if (externalIdFormAlreadyExists) {
        return new Error(`Form with external id '${props.external_form_id}' already exists`)
      }

      formExists.updateExternalId(props.external_form_id)
    }

    if (props.treatment_ids) {
      const allTreatments = await this.treatmentRepo.getAll()

      if (!props.treatment_ids.some(treatmentId => allTreatments.map(t => t.id).includes(treatmentId))) {
        return new Error("Some treatment does not exists")
      }

      formExists.updateTreatments(
        props.treatment_ids.map(treatmentId => {
          const index = allTreatments.findIndex(treatment => treatment.id === treatmentId) as number
  
          return allTreatments[index]
        })
      )
    }

    await this.formRepo.update(formExists)

    return void 0;
  }
}