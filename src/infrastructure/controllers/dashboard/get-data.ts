import type { GetDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-data";

export class GetDashboardDataController {
  constructor(
    private readonly useCase: GetDashboardDataUseCase,
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