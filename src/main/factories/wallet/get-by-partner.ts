import { GetWalletByPartnerIdUseCase } from "../../../application/use-cases/wallet/get-by-partner"
import { GetWalletByPartnerIdController } from "../../../infrastructure/controllers/wallet/get-by-partner"
import { PrismaWalletRepository } from "../../../infrastructure/repos/prisma/wallet"

export const makeGetWalletByPartnerIdController = () => {
  const walletRepo = new PrismaWalletRepository()
  const useCase = new GetWalletByPartnerIdUseCase(walletRepo)
  return new GetWalletByPartnerIdController(useCase)
}