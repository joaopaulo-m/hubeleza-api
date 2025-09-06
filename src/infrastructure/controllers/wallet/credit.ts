import type { CreditWalletDto, CreditWalletUseCase } from "../../../application/use-cases/wallet/credit";

export class CreditWalletController {
  constructor(
    private readonly useCase: CreditWalletUseCase,
  ){}

  async handle(props: CreditWalletDto) {
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
      statusCode: 204,
      response: {}
    }
  }
}