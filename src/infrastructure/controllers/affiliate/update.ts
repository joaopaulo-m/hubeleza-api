import type { UpdateAffiliateDto, UpdateAffiliateUseCase } from "../../../application/use-cases/affiliate/update";

export class UpdateAffiliateController {
  constructor(
    private readonly useCase: UpdateAffiliateUseCase,
  ){}

  async handle(props: UpdateAffiliateDto) {
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