import type { DeletePartnerUseCase } from "../../../application/use-cases/partner/delete";

export class DeletePartnerController {
  constructor(
    private readonly useCase: DeletePartnerUseCase,
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
      statusCode: 204,
      response: {}
    }
  }
}