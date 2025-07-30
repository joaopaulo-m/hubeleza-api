import type { UpdateTreatmentDto, UpdateTreatmentUseCase } from "../../../application/use-cases/treatment/update";

export class UpdateTreatmentController {
  constructor(
    private readonly useCase: UpdateTreatmentUseCase,
  ){}

  async handle(props: UpdateTreatmentDto) {
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