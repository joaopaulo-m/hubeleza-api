import type { FetchAffiliatesDto, GetAffiliatesUseCase } from "../../../application/use-cases/affiliate/get-all";

export class GetAffiliatesController {
  constructor(
    private readonly useCase: GetAffiliatesUseCase,
  ){}

  async handle(props: FetchAffiliatesDto) {
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