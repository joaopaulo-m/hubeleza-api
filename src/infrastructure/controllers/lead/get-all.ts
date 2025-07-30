import type { GetAllLeadsUseCase } from "../../../application/use-cases/lead/get-all";

export class GetAllLeadsController {
  constructor(
    private readonly useCase: GetAllLeadsUseCase,
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