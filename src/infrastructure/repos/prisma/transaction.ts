import type { ITransactionRepository } from "../../../application/contracts/repos/transaction";
import { TransactionMapper } from "../../../application/mappers/transaction";
import type { Transaction } from "../../../domain/entities/transaction";
import { prisma } from "../../services/prisma";

export class PrismaTransactionRepository implements ITransactionRepository {
  async getTopDepositors(limit: number): Promise<{ partner_name: string, total_deposit: number }[]> {
    const raw = await prisma.$queryRawUnsafe<
      { partner_name: string, total_deposit: number }[]
    >(`
      SELECT p.name AS partner_name, SUM(t.amount) AS total_deposit
      FROM transactions t
      JOIN wallets w ON w.id = t.wallet_id
      JOIN partners p ON p.id = w.partner_id
      WHERE t.type = 'deposit'
      GROUP BY p.name
      ORDER BY total_deposit DESC
      LIMIT $1
    `, limit);
  
    return raw;
  }

  async findById(id: string) {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id
      },
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
    })

    if (transaction) {
      return TransactionMapper.toDomain(transaction)
    }

    return null
  }

  async findByExternalId(external_id: string) {
    const transaction = await prisma.transaction.findFirst({
      where: {
        external_id
      },
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
    })

    if (transaction) {
      return TransactionMapper.toDomain(transaction)
    }

    return null
  }

  async findByPartnerId(partner_id: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        wallet: {
          partner_id
        }
      },
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
      },
      orderBy: {
        created_at: "desc"
      }
    })

    return transactions.map(TransactionMapper.toDomain)
  }

  async create(transaction: Transaction) {
    const data = {
      ...TransactionMapper.toPersistence(transaction),
      lead: undefined
    }

    await prisma.transaction.create({
      data: {
        ...data,
        lead_id: transaction.lead?.id
      }
    })
  }

  async update(transaction: Transaction) {
    const data = {
      ...TransactionMapper.toPersistence(transaction),
      id: undefined,
      wallet_id: undefined,
      external_id: undefined,
      lead: undefined
    }

    await prisma.transaction.update({
      where: {
        id: transaction.id
      },
      data
    })
  }
}