import type { GetTransactionByIdUseCase } from "../../../application/use-cases/transaction/get-by-id";

export class GetTransactionByIdController {
  constructor(
    private readonly useCase: GetTransactionByIdUseCase,
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