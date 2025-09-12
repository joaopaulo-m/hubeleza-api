import type { ITransactionRepository } from "../../../application/contracts/repos/transaction";
import { TransactionMapper } from "../../../application/mappers/transaction";
import type { GetTransactionsDto } from "../../../application/use-cases/transaction/get-all";
import type { Transaction } from "../../../domain/entities/transaction";
import type { TransactionStatus } from "../../../domain/enums/transaction-status";
import type { TransactionType } from "../../../domain/enums/transaction-type";
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

  async getAll(props: GetTransactionsDto) {
    const transactions = await prisma.transaction.findMany({
      where: {
        wallet: {
          partner: {
            name: props?.partner_name
            ? {
                contains: props.partner_name,
                mode: "insensitive"
              }
            : undefined,
            company_name: props?.partner_name
            ? {
                contains: props.partner_name,
                mode: "insensitive"
              }
            : undefined,
          }
        },
        lead: {
          name: props?.lead_name
            ? {
                contains: props.lead_name,
                mode: "insensitive"
              }
            : undefined,
        },
        type: props.type,
        status: props.status,
        amount: {
          gte: props.min_amount,
          lte: props.max_amount
        },
        created_at: {
          gte: props.start_date,
          lte: props.end_date
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
      take: props.limit,
      skip: props.page && props.limit ? (props.page - 1) * props.limit : undefined,
      orderBy: {
        created_at: "desc"
      }
    })

    return transactions.map(TransactionMapper.toDomain)
  }

  async countAll({ startDate, endDate }: { startDate?: number, endDate?: number } = {}) {
    return prisma.transaction.count({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate
        }
      }
    })
  }

  async sumAmount({ startDate, endDate }: { startDate?: number, endDate?: number } = {}) {
    const result = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        created_at: {
          gte: startDate,
          lte: endDate
        }
      }
    })
    return result._sum.amount || 0
  }

  async sumByType(type: TransactionType, { startDate, endDate }: { startDate?: number, endDate?: number } = {}) {
    const result = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        type,
        created_at: {
          gte: startDate,
          lte: endDate
        }
      }
    })
    return result._sum.amount || 0
  }

  async countByStatus(status: TransactionStatus, { startDate, endDate }: { startDate?: number, endDate?: number } = {}) {
    return prisma.transaction.count({
      where: {
        status,
        created_at: {
          gte: startDate,
          lte: endDate
        }
      }
    })
  }

  async getMonthlyGrowth(): Promise<number> {
    const now = new Date()
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime()
    const endOfLastMonth = startOfThisMonth - 1

    const lastMonthAmount = await this.sumAmount({ startDate: startOfLastMonth, endDate: endOfLastMonth })
    const thisMonthAmount = await this.sumAmount({ startDate: startOfThisMonth })

    if (lastMonthAmount === 0) return thisMonthAmount === 0 ? 0 : 100

    return ((thisMonthAmount - lastMonthAmount) / lastMonthAmount) * 100
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