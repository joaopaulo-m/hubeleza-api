import type { GetAffiliateDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-affiliate-data";

export class GetAffiliateDashboardDataController {
  constructor(
    private readonly useCase: GetAffiliateDashboardDataUseCase,
  ){}

  async handle(affiliate_id: string) {
    const result = await this.useCase.execute(affiliate_id);
    
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