import type { ExportPartnersUseCase } from "../../../application/use-cases/partner/export";
import type { FetchPartersDto } from "../../../application/use-cases/partner/get-all";

export class ExportPartnersController {
  constructor(
    private readonly useCase: ExportPartnersUseCase,
  ){}

  async handle(props: FetchPartersDto) {
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