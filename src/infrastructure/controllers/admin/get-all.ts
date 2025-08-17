import type { CreateFirstAdminDto, CreateFirstAdminUseCase } from "../../../application/use-cases/admin/create-first";
import type { GetAllAdminsUseCase } from "../../../application/use-cases/admin/get-all";

export class GetAllAdminsController {
  constructor(
    private readonly useCase: GetAllAdminsUseCase,
  ){}

  async handle() {
    const result = await this.useCase.execute();
    
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