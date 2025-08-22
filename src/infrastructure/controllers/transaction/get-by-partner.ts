import type { GetPartnerTransactionsUseCase } from "../../../application/use-cases/transaction/get-by-partner";

export class GetPartnerTransactionsController {
  constructor(
    private readonly useCase: GetPartnerTransactionsUseCase,
  ){}

  async handle(id: string) {
    const result = await this.useCase.execute(id);
    
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