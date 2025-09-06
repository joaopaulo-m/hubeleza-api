import type { IOperatorRepository } from "../../../application/contracts/repos/operator";
import { OperatorMapper } from "../../../application/mappers/operator";
import type { Operator } from "../../../domain/entities/operator";
import { prisma } from "../../services/prisma";

export class PrismaOperatorRepository implements IOperatorRepository {
  async findById(id: string) {
    const operator = await prisma.operator.findFirst({
      where: {
        id
      }
    })

    if (operator) return OperatorMapper.toDomain(operator)
    return null
  }

  async findByEmail(email: string) {
    const operator = await prisma.operator.findFirst({
      where: {
        email
      }
    })

    if (operator) return OperatorMapper.toDomain(operator)
    return null
  }

  async getAll() {
    const operators = await prisma.operator.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return operators.map(OperatorMapper.toDomain)
  }

  async create(domain: Operator) {
    await prisma.operator.create({
      data: OperatorMapper.toPersistence(domain)
    })
  }

  async update(domain: Operator) {
    const data = {
      ...OperatorMapper.toPersistence(domain),
      id: undefined,
    }

    await prisma.operator.update({
      where: {
        id: domain.id
      },
      data
    })
  }

  async delete(id: string) {
    await prisma.operator.delete({
      where: {
        id
      }
    })
  }
}