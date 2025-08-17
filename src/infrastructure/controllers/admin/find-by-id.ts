import type { FindAdminByIdUseCase } from "../../../application/use-cases/admin/find-by-id";

export class FindAdminByIdController {
  constructor(
    private readonly useCase: FindAdminByIdUseCase,
  ){}

  async handle(id: string) {
    const result = await this.useCase.execute(id);
    
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