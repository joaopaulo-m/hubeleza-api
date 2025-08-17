import type { IAdminRepository } from "../../../application/contracts/repos/admin";
import { AdminMapper } from "../../../application/mappers/admin";
import type { Admin } from "../../../domain/entities/admin";
import { prisma } from "../../services/prisma";

export class PrismaAdminRepository implements IAdminRepository {
  async countAll() {
    return await prisma.admin.count()
  }

  async findById(id: string) {
    const admin = await prisma.admin.findFirst({
      where: {
        id
      }
    })

    if (admin) {
      return AdminMapper.toDomain(admin)
    }

    return null
  }

  async findByEmail(email: string) {
    const admin = await prisma.admin.findFirst({
      where: {
        email
      }
    })

    if (admin) {
      return AdminMapper.toDomain(admin)
    }

    return null
  }

  async getAll() {
    const admins = await prisma.admin.findMany()

    return admins.map(AdminMapper.toDomain)
  }

  async create(admin: Admin) {
    await prisma.admin.create({
      data: {
        ...AdminMapper.toPersistence(admin)
      }
    })
  }

  async update(admin: Admin) {
    const data = {
      ...AdminMapper.toPersistence(admin),
      id: undefined,
      created_at: undefined,
    }

    await prisma.admin.update({
      where: {
        id: admin.id
      },
      data
    })
  }

  async delete(id: string) {
    await prisma.admin.delete({
      where: {
        id
      }
    })
  }
}