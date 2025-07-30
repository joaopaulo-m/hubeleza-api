import type { UpdatePartnerDto, UpdatePartnerUseCase } from "../../../application/use-cases/partner/update";

export class UpdatePartnerController {
  constructor(
    private readonly useCase: UpdatePartnerUseCase,
  ){}

  async handle(props: UpdatePartnerDto) {
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
    }
  }
}