import type { GetAdminDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-admin-data";

export class GetAdminDashboardDataController {
  constructor(
    private readonly useCase: GetAdminDashboardDataUseCase,
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