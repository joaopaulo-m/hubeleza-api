import type { UpdateAdminDto, UpdateAdminUseCase } from "../../../application/use-cases/admin/update";

export class UpdateAdminController {
  constructor(
    private readonly useCase: UpdateAdminUseCase,
  ){}

  async handle(props: UpdateAdminDto) {
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