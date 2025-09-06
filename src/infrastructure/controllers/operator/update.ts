import type { UpdateOperatorDto, UpdateOperatorUseCase } from "../../../application/use-cases/operator/update";

export class UpdateOperatorController {
  constructor(
    private readonly useCase: UpdateOperatorUseCase,
  ){}

  async handle(props: UpdateOperatorDto) {
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