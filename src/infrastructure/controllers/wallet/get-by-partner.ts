import type { GetWalletByPartnerIdUseCase } from "../../../application/use-cases/wallet/get-by-partner";

export class GetWalletByPartnerIdController {
  constructor(
    private readonly useCase: GetWalletByPartnerIdUseCase,
  ){}

  async handle(partner_id: string) {
    const result = await this.useCase.execute(partner_id);
    
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