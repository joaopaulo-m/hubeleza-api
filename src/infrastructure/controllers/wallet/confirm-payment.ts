import type { ConfirmWalletPaymentDto, ConfirmWalletPaymentUseCase } from "../../../application/use-cases/wallet/confirm-payment";

export class ConfirmWalletPaymentController {
  constructor(
    private readonly useCase: ConfirmWalletPaymentUseCase,
  ){}

  async handle(props: ConfirmWalletPaymentDto) {
    const result = await this.useCase.execute(props);
    
    if (result instanceof Error) {
      return {
        statusCode: 200,
        response: {
          message: result.message
        }
      }
    }

    return {
      statusCode: 200,
      response: {}
    }
  }
}