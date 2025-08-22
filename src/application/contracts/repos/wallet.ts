import type { Wallet } from "../../../domain/entities/wallet";

export interface IWalletRepository {
  findById: (id: string) => Promise<null | Wallet>
  findByPartnerId: (id: string) => Promise<null | Wallet>
  getTotalBalance(): Promise<number>
  create: (wallet: Wallet) => Promise<void>
  update: (wallet: Wallet) => Promise<void>
}