import type { DeleteOperatorUseCase } from "../../../application/use-cases/operator/delete";

export class DeleteOperatorController {
  constructor(
    private readonly useCase: DeleteOperatorUseCase,
  ){}

  async handle(id: string) {
    const result = await this.useCase.execute(id);
    
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