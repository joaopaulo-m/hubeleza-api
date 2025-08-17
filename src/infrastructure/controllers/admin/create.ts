import type { CreateAdminDto, CreateAdminUseCase } from "../../../application/use-cases/admin/create";

export class CreateAdminController {
  constructor(
    private readonly useCase: CreateAdminUseCase,
  ){}

  async handle(props: CreateAdminDto) {
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