import type { GetOperatorByIdUseCase } from "../../../application/use-cases/operator/get-by-id";

export class GetOperatorByIdController {
  constructor(
    private readonly useCase: GetOperatorByIdUseCase,
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
      statusCode: 200,
      response: result
    }
  }
}