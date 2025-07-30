import type { DeleteTreatmentUseCase } from "../../../application/use-cases/treatment/delete";

export class DeleteTreatmentController {
  constructor(
    private readonly useCase: DeleteTreatmentUseCase,
  ){}

  async handle(treatment_id: string) {
    const result = await this.useCase.execute(treatment_id);
    
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