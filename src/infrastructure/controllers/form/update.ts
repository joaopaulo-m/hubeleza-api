import type { UpdateFormDto, UpdateFormUseCase } from "../../../application/use-cases/form/update";

export class UpdateFormController {
  constructor(
    private readonly useCase: UpdateFormUseCase,
  ){}

  async handle(props: UpdateFormDto) {
    const result = await this.useCase.execute(props);
    
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