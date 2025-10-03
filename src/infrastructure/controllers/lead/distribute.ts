import type { DistributeLeadDto, DistributeLeadUseCase } from "../../../application/use-cases/lead/distribute";

export class DistributeLeadController {
  constructor(
    private readonly useCase: DistributeLeadUseCase,
  ){}

  async handle(props: DistributeLeadDto) {
    const result = await this.useCase.execute(props);
    
    if (result instanceof Error) {
      console.log("Error on lead webhook: ", result)

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