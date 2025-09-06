import type { UpdateTreatmentStatePriceDto, UpdateTreatmentStatePriceUseCase } from "../../../application/use-cases/treatment-state-price/update";

export class UpdateTreatmentStatePriceController {
  constructor(
    private readonly useCase: UpdateTreatmentStatePriceUseCase,
  ){}

  async handle(props: UpdateTreatmentStatePriceDto) {
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