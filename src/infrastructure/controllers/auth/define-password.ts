import type { DefinePasswordDto, DefinePasswordUseCase } from "../../../application/use-cases/auth/define-password";

export class DefinePasswordController {
  constructor(
    private readonly useCase: DefinePasswordUseCase,
  ){}

  async handle(props: DefinePasswordDto) {
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