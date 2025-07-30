import type { DeleteLeadUseCase } from "../../../application/use-cases/lead/delete";

export class DeleteLeadController {
  constructor(
    private readonly useCase: DeleteLeadUseCase,
  ){}

  async handle(lead_id: string) {
    const result = await this.useCase.execute(lead_id);
    
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