import type { IAffiliateTransactionRepository } from "../../../application/contracts/repos/affiliate-transaction";
import { AffiliateTransactionMapper } from "../../../application/mappers/affiliate-transaction";
import type { FetchAffiliateTransactionsDto } from "../../../application/use-cases/affiliate-transaction/get-all";
import type { AffiliateTransaction } from "../../../domain/entities/affiliate-transaction";
import type { TransactionType } from "../../../domain/enums/transaction-type";
import { prisma } from "../../services/prisma";

export class PrismaAffiliateTransactionRepository implements IAffiliateTransactionRepository {
  async countAllAmount({ affiliate_id, type }: { affiliate_id: string, type: TransactionType }) {
    const count = await prisma.affiliateTransaction.aggregate({
      where: {
        affiliate_wallet: {
          affiliate_id
        },
        type
      },
      _sum: {
        amount: true
      }
    })

    return count._sum.amount || 0
  }

  async getAll(props: FetchAffiliateTransactionsDto) {
    const transactions = await prisma.affiliateTransaction.findMany({
      where: {
        affiliate_wallet: {
          affiliate_id: props.affiliate_id
        },
        type: props.type,
        partner: {
          name: props.partner_name ? {
            contains: props.partner_name,
            mode: "insensitive"
          } : undefined
        },
        created_at: {
          gte: props.start_date,
          lte: props.end_date
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return transactions.map(AffiliateTransactionMapper.toDomain)
  }

  async create(affiliateTransaction: AffiliateTransaction) {
    const data = AffiliateTransactionMapper.toPersistence(affiliateTransaction)

    await prisma.affiliateTransaction.create({ data })
  }
}