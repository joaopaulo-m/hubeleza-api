import type { GetPartnerByIdUseCase } from "../../../application/use-cases/partner/get-by-id";

export class GetPartnerByIdController {
  constructor(
    private readonly useCase: GetPartnerByIdUseCase,
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