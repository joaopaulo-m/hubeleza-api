import type { CreateFirstAdminDto, CreateFirstAdminUseCase } from "../../../application/use-cases/admin/create-first";

export class CreateFirstAdminController {
  constructor(
    private readonly useCase: CreateFirstAdminUseCase,
  ){}

  async handle(props: CreateFirstAdminDto) {
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