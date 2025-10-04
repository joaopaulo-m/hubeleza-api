import type { CheckAffiliateReferralCodeAvailabilityUseCase } from "../../../application/use-cases/affiliate/check-referral-code-availability";

export class CheckAffiliateReferralCodeAvailabilityController {
  constructor(
    private readonly useCase: CheckAffiliateReferralCodeAvailabilityUseCase,
  ){}

  async handle(referral_code: string) {
    const result = await this.useCase.execute(referral_code);
    
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