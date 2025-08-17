import type { CreateFirstAdminDto, CreateFirstAdminUseCase } from "../../../application/use-cases/admin/create-first";
import type { DeleteAdminDto, DeleteAdminUseCase } from "../../../application/use-cases/admin/delete";

export class DeleteAdminController {
  constructor(
    private readonly useCase: DeleteAdminUseCase,
  ){}

  async handle(props: DeleteAdminDto) {
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