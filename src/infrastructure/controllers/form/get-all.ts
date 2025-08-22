import type { FetchFormsOptions } from "../../../application/contracts/repos/form";
import type { GetAllFormsUseCase } from "../../../application/use-cases/form/get-all";

export class GetAllFormsController {
  constructor(
    private readonly useCase: GetAllFormsUseCase,
  ){}

  async handle(props: FetchFormsOptions) {
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