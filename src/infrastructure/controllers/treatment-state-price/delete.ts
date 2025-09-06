import type { DeleteTreatmentStatePriceUseCase } from "../../../application/use-cases/treatment-state-price/delete";

export class DeleteTreatmentStatePriceController {
  constructor(
    private readonly useCase: DeleteTreatmentStatePriceUseCase,
  ){}

  async handle(treatment_state_price_id: string) {
    const result = await this.useCase.execute(treatment_state_price_id);
    
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