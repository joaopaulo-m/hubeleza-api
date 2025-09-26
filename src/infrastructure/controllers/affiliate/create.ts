import type { CreateAffiliateDto, CreateAffiliateUseCase } from "../../../application/use-cases/affiliate/create";

export class CreateAffiliateController {
  constructor(
    private readonly useCase: CreateAffiliateUseCase,
  ){}

  async handle(props: CreateAffiliateDto) {
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
      statusCode: 201,
      response: {}
    }
  }
}