import type { GetPartnerDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-partner-data";

export class GetPartnerDashboardDataController {
  constructor(
    private readonly useCase: GetPartnerDashboardDataUseCase,
  ){}

  async handle(partner_id: string) {
    const result = await this.useCase.execute(partner_id);
    
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