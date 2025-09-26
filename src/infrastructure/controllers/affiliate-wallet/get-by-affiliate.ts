import type { GetAffiliateWalletByAffiliateIdUseCase } from "../../../application/use-cases/affiliate-wallet/get-by-affiliate";

export class GetAffiliateWalletByAffiliateIdController {
  constructor(
    private readonly useCase: GetAffiliateWalletByAffiliateIdUseCase,
  ){}

  async handle(affiliate_id: string) {
    const result = await this.useCase.execute(affiliate_id);
    
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