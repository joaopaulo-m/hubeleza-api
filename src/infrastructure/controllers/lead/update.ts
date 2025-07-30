import type { UpdateLeadDto, UpdateLeadUseCase } from "../../../application/use-cases/lead/update";

export class UpdateLeadController {
  constructor(
    private readonly useCase: UpdateLeadUseCase,
  ){}

  async handle(props: UpdateLeadDto) {
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