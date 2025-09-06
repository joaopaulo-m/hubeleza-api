import type { IOperatorRepository } from "../../contracts/repos/operator";
import type { OperatorDto } from "../../dtos/operator";
import { OperatorMapper } from "../../mappers/operator";

export class GetOperatorByIdUseCase {
  constructor(
    private readonly operatorRepo: IOperatorRepository
  ){}

  async execute(id: string): Promise<Error | OperatorDto> {
    const operator = await this.operatorRepo.findById(id)

    if (!operator) {
      return new Error("Operator not found")
    }

    return OperatorMapper.toDto(operator)
  }
}