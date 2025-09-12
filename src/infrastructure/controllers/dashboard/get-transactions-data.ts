import type { GetTransactionsDashboardDataDto, GetTransactionsDashboardDataUseCase } from "../../../application/use-cases/dashboard/get-transactions-data";

export class GetTransactionsDashboardDataController {
  constructor(
    private readonly useCase: GetTransactionsDashboardDataUseCase,
  ){}

  async handle(props: GetTransactionsDashboardDataDto) {
    const result = await this.useCase.execute(props);
    
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