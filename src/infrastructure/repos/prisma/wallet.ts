import type { IWalletRepository } from "../../../application/contracts/repos/wallet";
import { WalletMapper } from "../../../application/mappers/wallet";
import type { Wallet } from "../../../domain/entities/wallet";
import { prisma } from "../../services/prisma";

export class PrismaWalletRepository implements IWalletRepository {
  async getTotalBalance(): Promise<number> {
    const result = await prisma.wallet.aggregate({
      _sum: { balance: true }
    });
  
    return result._sum.balance ?? 0;
  }

  async findById(id: string) {
    const wallet = await prisma.wallet.findFirst({
      where: {
        id
      },
      include: {
        transactions: {
          include: {
            lead: {
              include: {
                leads_treatments: {
                  include: {
                    treatment: {
                      include: {
                        state_prices: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (wallet) {
      return WalletMapper.toDomain(wallet)
    }

    return null
  }

  async findByPartnerId(partner_id: string) {
    const wallet = await prisma.wallet.findFirst({
      where: {
        partner_id
      },
      include: {
        transactions: {
          include: {
            lead: {
              include: {
                leads_treatments: {
                  include: {
                    treatment: {
                      include: {
                        state_prices: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (wallet) {
      return WalletMapper.toDomain(wallet)
    }

    return null
  }

  async create(wallet: Wallet) {
    const data = {
      ...WalletMapper.toPersistence(wallet),
      transactions: undefined
    }

    await prisma.wallet.create({
      data
    })
  }

  async update(wallet: Wallet) {
    const data = {
      ...WalletMapper.toPersistence(wallet),
      id: undefined,
      partner_id: undefined,
      transactions: undefined
    }

    await prisma.wallet.update({
      where: {
        id: wallet.id
      },
      data
    })
  }
}