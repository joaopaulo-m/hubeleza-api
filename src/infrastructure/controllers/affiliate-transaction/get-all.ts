import type { FetchAffiliateTransactionsDto, GetAffiliateTransactionsUseCase } from "../../../application/use-cases/affiliate-transaction/get-all";

export class GetAffiliateTransactionsController {
  constructor(
    private readonly useCase: GetAffiliateTransactionsUseCase,
  ){}

  async handle(props: FetchAffiliateTransactionsDto) {
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