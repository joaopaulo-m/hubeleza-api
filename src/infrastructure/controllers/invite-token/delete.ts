import type { DeleteInviteTokenUseCase } from "../../../application/use-cases/invite-token/delete";

export class DeleteInviteTokenController {
  constructor(
    private readonly useCase: DeleteInviteTokenUseCase,
  ){}

  async handle(invite_token_id: string) {
    const result = await this.useCase.execute(invite_token_id);
    
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