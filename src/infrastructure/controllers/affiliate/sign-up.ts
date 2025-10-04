import type { SignAffiliateUpDto, SignAffiliateUpUseCase } from "../../../application/use-cases/affiliate/sign-up";

export class SignAffiliateUpController {
  constructor(
    private readonly useCase: SignAffiliateUpUseCase,
  ){}

  async handle(props: SignAffiliateUpDto) {
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