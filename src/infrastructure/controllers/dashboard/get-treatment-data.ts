import type { GetTreatmentDataUseCase } from "../../../application/use-cases/dashboard/get-treatment-data";

export class GetTreatmentDataController {
  constructor(
    private readonly useCase: GetTreatmentDataUseCase,
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
      statusCode: 200,
      response: result
    }
  }
}