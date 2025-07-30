import type { GetAllFormsUseCase } from "../../../application/use-cases/form/get-all";

export class GetAllFormsController {
  constructor(
    private readonly useCase: GetAllFormsUseCase,
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