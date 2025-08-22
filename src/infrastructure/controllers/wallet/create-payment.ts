import type { CreateWalletPaymentDto, CreateWalletPaymentUseCase } from "../../../application/use-cases/wallet/create-payment";

export class CreateWalletPaymentController {
  constructor(
    private readonly useCase: CreateWalletPaymentUseCase,
  ){}

  async handle(props: CreateWalletPaymentDto) {
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