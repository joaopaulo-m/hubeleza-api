import type { UpdatePartnerStatusDto, UpdatePartnerStatusUseCase } from "../../../application/use-cases/partner/update-status";

export class UpdatePartnerStatusController {
  constructor(
    private readonly useCase: UpdatePartnerStatusUseCase,
  ){}

  async handle(props: UpdatePartnerStatusDto) {
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