import type { GetAllInviteTokensUseCase } from "../../../application/use-cases/invite-token/get-all";

export class GetAllInviteTokensController {
  constructor(
    private readonly useCase: GetAllInviteTokensUseCase,
  ){}

  async handle() {
    const result = await this.useCase.execute();
    
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