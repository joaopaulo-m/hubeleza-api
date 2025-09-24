import type { GetAffiliateByIdUseCase } from "../../../application/use-cases/affiliate/get-by-id";

export class GetAffiliateByIdController {
  constructor(
    private readonly useCase: GetAffiliateByIdUseCase,
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