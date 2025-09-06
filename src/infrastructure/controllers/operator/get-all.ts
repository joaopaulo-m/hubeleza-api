import type { GetAllOperatorsUseCase } from "../../../application/use-cases/operator/get-all";

export class GetAllOperatorsController {
  constructor(
    private readonly useCase: GetAllOperatorsUseCase,
  ){}

  async handle() {
    const result = await this.useCase.execute();
    
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