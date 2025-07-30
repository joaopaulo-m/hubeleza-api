import type { GetAllTreatmentsUseCase } from "../../../application/use-cases/treatment/get-all";

export class GetAllTreatmentsController {
  constructor(
    private readonly useCase: GetAllTreatmentsUseCase,
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