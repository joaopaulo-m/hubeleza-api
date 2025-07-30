import type { IFormRepository } from "../../contracts/repos/form";

export interface UpdateFormDto {
  form_id: string
  name?: string
  external_form_id?: string
}

export class UpdateFormUseCase {
  constructor(
    private readonly formRepo: IFormRepository
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
    await this.formRepo.update(formExists)

    return void 0;
  }
}