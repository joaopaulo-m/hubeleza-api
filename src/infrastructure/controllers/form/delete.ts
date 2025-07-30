import type { DeleteFormUseCase } from "../../../application/use-cases/form/delete";

export class DeleteFormController {
  constructor(
    private readonly useCase: DeleteFormUseCase,
  ){}

  async handle(form_id: string) {
    const result = await this.useCase.execute(form_id);
    
    if (result instanceof Error) {
      return {
        statusCode: 400,
        response: {
          message: result.message
        }
      }
    }

    return {
      statusCode: 204,
      response: {}
    }
  }
}