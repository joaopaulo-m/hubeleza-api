import type { AuthenticateKeyUseCase } from "../../../application/use-cases/auth/authenticate-key";

export class AuthenticateKeyController {
  constructor(
    private readonly useCase: AuthenticateKeyUseCase,
  ){}

  async handle(api_key: string) {
    const result = await this.useCase.execute(api_key);
    
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