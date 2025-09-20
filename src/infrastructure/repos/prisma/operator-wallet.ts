import type { IOperatorWalletRepository } from "../../../application/contracts/repos/operator-wallet";
import { OperatorWalletMapper } from "../../../application/mappers/operator-wallet";
import type { OperatorWallet } from "../../../domain/entities/operator-wallet";
import { prisma } from "../../services/prisma";

export class PrismaOperatorWalletRepository implements IOperatorWalletRepository {
  async findByOperatorId(operator_id: string) {
    const operatorWallet = await prisma.operatorWallet.findFirst({
      where: {
        operator_id
      },
      include: {
        transactions: true
      }
    })

    if (operatorWallet) return OperatorWalletMapper.toDomain(operatorWallet)
    return null
  }

  async create(wallet: OperatorWallet) {
    const data = {
      ...OperatorWalletMapper.toPersistence(wallet),
      transactions: undefined
    }

    await prisma.operatorWallet.create({
      data
    })
  }

  async update(wallet: OperatorWallet) {
    const data = {
      ...OperatorWalletMapper.toPersistence(wallet),
      id: undefined,
      operator_id: undefined,
      transactions: undefined
    }

    await prisma.operatorWallet.update({
      where: {
        id: wallet.id
      },
      data
    })
  }
}