import type { GetInviteTokenByTokenUseCase } from "../../../application/use-cases/invite-token/get-by-token";

export class GetInviteTokenByTokenController {
  constructor(
    private readonly useCase: GetInviteTokenByTokenUseCase,
  ){}

  async handle(token: string) {
    const result = await this.useCase.execute(token);
    
    if (result instanceof Error) {
      return {
        statusCode: 404,
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