import type { GetOperatorTransactionsDto, GetOperatorTransactionsUseCase } from "../../../application/use-cases/operator-transaction/get-all";

export class GetOperatorTransactionsController {
  constructor(
    private readonly useCase: GetOperatorTransactionsUseCase,
  ){}

  async handle(props: GetOperatorTransactionsDto) {
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