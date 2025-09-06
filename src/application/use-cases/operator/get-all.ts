import type { IOperatorRepository } from "../../contracts/repos/operator";
import type { OperatorDto } from "../../dtos/operator";
import { OperatorMapper } from "../../mappers/operator";

export class GetAllOperatorsUseCase {
  constructor(
    private readonly operatorRepo: IOperatorRepository
  ){}

  async execute(): Promise<OperatorDto[]> {
    const operators = await this.operatorRepo.getAll()

    return operators.map(OperatorMapper.toDto)
  }
}