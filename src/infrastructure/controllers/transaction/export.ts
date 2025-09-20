import type { ExportTransactionsUseCase } from "../../../application/use-cases/transaction/export";
import type { GetTransactionsDto } from "../../../application/use-cases/transaction/get-all";

export class ExportTransactionsController {
  constructor(
    private readonly useCase: ExportTransactionsUseCase,
  ){}

  async handle(props: GetTransactionsDto) {
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