import type { CreatePartnerDto, CreatePartnerUseCase } from "../../../application/use-cases/partner/create";

export class CreatePartnerController {
  constructor(
    private readonly useCase: CreatePartnerUseCase,
  ){}

  async handle(props: CreatePartnerDto) {
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
      response: {}
    }
  }
}