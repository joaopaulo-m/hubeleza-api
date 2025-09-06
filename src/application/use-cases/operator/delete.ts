import type { IOperatorRepository } from "../../contracts/repos/operator";

export class DeleteOperatorUseCase {
  constructor(
    private readonly operatorRepo: IOperatorRepository
  ){}

  async execute(operator_id: string): Promise<Error | void> {
    const operator = await this.operatorRepo.findById(operator_id)

    if (!operator) {
      return new Error("Operator not found")
    }

    await this.operatorRepo.delete(operator.id)
    return void 0
  }
}