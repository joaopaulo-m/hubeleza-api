import type { GetLeadByIdUseCase } from "../../../application/use-cases/lead/get-by-id";

export class GetLeadByIdController {
  constructor(
    private readonly useCase: GetLeadByIdUseCase,
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
      statusCode: 200,
      response: result
    }
  }
}