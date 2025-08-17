import type { SignPartnerUpDto, SignPartnerUpUseCase } from "../../../application/use-cases/partner/sign-up";

export class SignPartnerUpController {
  constructor(
    private readonly useCase: SignPartnerUpUseCase,
  ){}

  async handle(props: SignPartnerUpDto) {
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
      statusCode: 201,
      response: {}
    }
  }
}