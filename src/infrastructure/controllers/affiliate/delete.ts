import type { DeleteAffiliateUseCase } from "../../../application/use-cases/affiliate/delete";

export class DeleteAffiliateController {
  constructor(
    private readonly useCase: DeleteAffiliateUseCase,
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
      statusCode: 204,
      response: {}
    }
  }
}