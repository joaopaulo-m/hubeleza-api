import type { GetTransactionsDto, GetTransactionsUseCase } from "../../../application/use-cases/transaction/get-all";

export class GetTransactionsController {
  constructor(
    private readonly useCase: GetTransactionsUseCase,
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