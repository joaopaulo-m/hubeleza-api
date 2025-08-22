import type { GetPartnerLeadsDto, GetPartnerLeadsUseCase } from "../../../application/use-cases/lead/get-by-partner";

export class GetPartnerLeadsController {
  constructor(
    private readonly useCase: GetPartnerLeadsUseCase,
  ){}

  async handle(props: GetPartnerLeadsDto) {
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