import type { FetchPartersDto, GetAllPartnersUseCase } from "../../../application/use-cases/partner/get-all";

export class GetAllPartnersController {
  constructor(
    private readonly useCase: GetAllPartnersUseCase,
  ){}

  async handle(props: FetchPartersDto) {
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