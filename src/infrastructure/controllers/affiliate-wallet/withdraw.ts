import type { WithdrawAffiliateWalletDto, WithdrawAffiliateWalletUseCase } from "../../../application/use-cases/affiliate-wallet/withdraw";

export class WithdrawAffiliateWalletController {
  constructor(
    private readonly useCase: WithdrawAffiliateWalletUseCase,
  ){}

  async handle(props: WithdrawAffiliateWalletDto) {
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