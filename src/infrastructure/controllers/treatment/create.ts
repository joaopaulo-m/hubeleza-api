import type { CreateTreatmentDto, CreateTreatmentUseCase } from "../../../application/use-cases/treatment/create";

export class CreateTreatmentController {
  constructor(
    private readonly useCase: CreateTreatmentUseCase,
  ){}

  async handle(props: CreateTreatmentDto) {
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