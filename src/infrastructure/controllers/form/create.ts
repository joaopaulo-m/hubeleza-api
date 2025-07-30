import type { CreateFormDto, CreateFormUseCase } from "../../../application/use-cases/form/create";

export class CreateFormController {
  constructor(
    private readonly useCase: CreateFormUseCase,
  ){}

  async handle(props: CreateFormDto) {
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
      statusCode: 201,
      response: {}
    }
  }
}