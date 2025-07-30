import type { IFormRepository } from "../../contracts/repos/form";

export class DeleteFormUseCase {
  constructor(
    private readonly formRepo: IFormRepository
  ){}

  async execute(form_id: string): Promise<Error | void> {
    const formExists = await this.formRepo.findById(form_id)

    if (!formExists) {
      return new Error("Form does not exists")
    }

    await this.formRepo.delete(form_id)
    return void 0;
  }
}