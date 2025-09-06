import type { CreateOperatorDto, CreateOperatorUseCase } from "../../../application/use-cases/operator/create";

export class CreateOperatorController {
  constructor(
    private readonly useCase: CreateOperatorUseCase,
  ){}

  async handle(props: CreateOperatorDto) {
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