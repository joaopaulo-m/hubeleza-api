import type { IOperatorWalletRepository } from "../../contracts/repos/operator-wallet";
import type { OperatorWalletDto } from "../../dtos/operator-wallet";
import { OperatorWalletMapper } from "../../mappers/operator-wallet";

export class GetOperatorWalletByOperatorIdUseCase {
  constructor(
    private readonly operatorWalletRepo: IOperatorWalletRepository
  ){}

  async execute(operator_id: string): Promise<Error | OperatorWalletDto> {
    const operatorWallet = await this.operatorWalletRepo.findByOperatorId(operator_id)

    if (!operatorWallet) {
      return new Error("Operator wallet not found")
    }

    return OperatorWalletMapper.toDto(operatorWallet)
  }
}