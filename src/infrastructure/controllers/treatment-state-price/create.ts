import type { CreateTreatmentStatePriceDto, CreateTreatmentStatePriceUseCase } from "../../../application/use-cases/treatment-state-price/create";

export class CreateTreatmentStatePriceController {
  constructor(
    private readonly useCase: CreateTreatmentStatePriceUseCase,
  ){}

  async handle(props: CreateTreatmentStatePriceDto) {
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