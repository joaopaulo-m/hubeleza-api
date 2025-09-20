import type { IOperatorTransactionRepository } from "../../../application/contracts/repos/operator-transaction";
import { OperatorTransactionMapper } from "../../../application/mappers/operator-transaction";
import type { GetOperatorTransactionsDto } from "../../../application/use-cases/operator-transaction/get-all";
import type { OperatorTransaction } from "../../../domain/entities/operator-transaction";
import type { ComissionType } from "../../../shared/enums/comission-type";
import { prisma } from "../../services/prisma";

export class PrismaOperatorTransactionRepository implements IOperatorTransactionRepository {
  async countAllAmount({ operator_id, comission_type }: { operator_id: string, comission_type: ComissionType; }) {
    const count = await prisma.operatorTransaction.aggregate({
      where: {
        operator_wallet: {
          operator_id: operator_id
        },
        comission_type: comission_type
      },
      _sum: {
        amount: true
      }
    })

    return count._sum.amount || 0
  }

  async fetch(props: GetOperatorTransactionsDto) {
    const operatorTransactions = await prisma.operatorTransaction.findMany({
      where: {
        operator_wallet: {
          operator_id: props.operator_id
        },
        type: props.type,
        partner: {
          name: props?.partner_name
            ? {
                contains: props.partner_name,
                mode: "insensitive"
              }
            : undefined,
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

    return operatorTransactions.map(OperatorTransactionMapper.toDomain)
  }

  async create(operator_transaction: OperatorTransaction) {
    const data = {
      ...OperatorTransactionMapper.toPersistence(operator_transaction)
    }

    await prisma.operatorTransaction.create({
      data
    })
  }
}