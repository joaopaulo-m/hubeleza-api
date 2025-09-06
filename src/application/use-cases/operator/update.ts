import type { IOperatorRepository } from "../../contracts/repos/operator";

export interface UpdateOperatorDto {
  operator_id: string
  name?: string
  email?: string
}

export class UpdateOperatorUseCase {
  constructor(
    private readonly operatorRepo: IOperatorRepository
  ){}

  async execute(props: UpdateOperatorDto): Promise<Error | void> {
    const operator = await this.operatorRepo.findById(props.operator_id)

    if (!operator) {
      return new Error("Operator not found")
    }

    if (!props.name && !props.email) {
      return new Error("No property to update")
    }

    if (props.name) {
      operator.updateName(props.name)
    }

    if (props.email) {
      operator.updateEmail(props.email)
    }

    await this.operatorRepo.update(operator)
    return void 0
  }
}