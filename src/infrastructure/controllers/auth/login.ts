import type { LoginDto, LoginUseCase } from "../../../application/use-cases/auth/login";

export class LoginController {
  constructor(
    private readonly useCase: LoginUseCase,
  ){}

  async handle(props: LoginDto) {
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