import type { IInviteTokenRepository } from "../../../application/contracts/repos/invite-token";
import { InviteTokenMapper } from "../../../application/mappers/invite-token";
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

  async getAll() {
    const tokens = await prisma.inviteToken.findMany({
      orderBy: {
        expires_at: "desc"
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

  async delete(id: string) {
    await prisma.inviteToken.delete({
      where: {
        id
      }
    })
  }
}