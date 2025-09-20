import type { GetOperatorDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-operator-data";

export class GetOperatorDashboardDataController {
  constructor(
    private readonly useCase: GetOperatorDashboardDataUseCase,
  ){}

  async handle(operator_id: string) {
    const result = await this.useCase.execute(operator_id);
    
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