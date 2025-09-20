import type { GetOperatorWalletByOperatorIdUseCase } from "../../../application/use-cases/operator-wallet/get-by-operator";

export class GetOperatorWalletByOperatorIdController {
  constructor(
    private readonly useCase: GetOperatorWalletByOperatorIdUseCase,
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