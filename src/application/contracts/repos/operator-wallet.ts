import type { OperatorWallet } from "../../../domain/entities/operator-wallet";

export interface IOperatorWalletRepository {
  findByOperatorId: (operator_id: string) => Promise<OperatorWallet | null>
  update: (wallet: OperatorWallet) => Promise<void>
}