import type { CreateInviteTokenDto, CreateInviteTokenUseCase } from "../../../application/use-cases/invite-token/create";

export class CreateInviteTokenController {
  constructor(
    private readonly useCase: CreateInviteTokenUseCase,
  ){}

  async handle(props: CreateInviteTokenDto) {
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
      statusCode: 200,
      response: result
    }
  }
}