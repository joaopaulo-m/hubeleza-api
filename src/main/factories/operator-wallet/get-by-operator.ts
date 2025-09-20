import { GetOperatorWalletByOperatorIdUseCase } from "../../../application/use-cases/operator-wallet/get-by-operator"
import { GetOperatorWalletByOperatorIdController } from "../../../infrastructure/controllers/operator-wallet/get-by-operator"
import { PrismaOperatorWalletRepository } from "../../../infrastructure/repos/prisma/operator-wallet"

export const makeGetOperatorWalletByOperatorIdController = () => {
  const operatorWalletRepo = new PrismaOperatorWalletRepository()
  const useCase = new GetOperatorWalletByOperatorIdUseCase(operatorWalletRepo)
  return new GetOperatorWalletByOperatorIdController(useCase)
}