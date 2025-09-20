import type { IInviteTokenRepository } from "../../../application/contracts/repos/invite-token";
import { InviteTokenMapper } from "../../../application/mappers/invite-token";
import type { FetchInviteTokensDto } from "../../../application/use-cases/invite-token/get-all";
import type { InviteToken } from "../../../domain/entities/invite-token";
import { prisma } from "../../services/prisma";

export class PrismaInviteTokenRepository implements IInviteTokenRepository {
  async findById(id: string) {
    const inviteToken = await prisma.inviteToken.findFirst({
      where: {
        id
      }
    })

    if (inviteToken) {
      return InviteTokenMapper.toDomain(inviteToken)
    }

    return null
  }

  async findByToken(token: string) {
    const inviteToken = await prisma.inviteToken.findFirst({
      where: {
        token
      }
    })

    if (inviteToken) {
      return InviteTokenMapper.toDomain(inviteToken)
    }

    return null
  }

  async findByTransactionId(transaction_id: string) {
    const inviteToken = await prisma.inviteToken.findFirst({
      where: {
        transaction_id
      }
    })

    if (inviteToken) {
      return InviteTokenMapper.toDomain(inviteToken)
    }

    return null
  }

  async getAll(props?: FetchInviteTokensDto) {
    const tokens = await prisma.inviteToken.findMany({
      where: {
        operator_id: props?.operator_id,
        name: props?.name
          ? {
              contains: props.name,
              mode: "insensitive"
            }
          : undefined,
        created_at: {
          gte: props?.start_date,
          lte: props?.end_date
        }
      },
      orderBy: {
        created_at: "desc"
      }
    })

    return tokens.map(InviteTokenMapper.toDomain)
  }

  async create(domain: InviteToken) {
    const data = {
      ...InviteTokenMapper.toPersistence(domain)
    }

    await prisma.inviteToken.create({
      data
    })
  }
  
  async addTransaction(invite_token_id: string, transaction_id: string) {
    try {
      await prisma.inviteToken.update({
        where: {
          id: invite_token_id
        },
        data: {
          transaction_id
        }
      })
    } catch (error) {
      return error as Error
    }
  }

  async delete(id: string) {
    await prisma.inviteToken.delete({
      where: {
        id
      }
    })
  }
}