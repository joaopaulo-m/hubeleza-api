import { CreateAdminUseCase } from "../../../application/use-cases/admin/create"
import { CreateAdminController } from "../../../infrastructure/controllers/admin/create"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"

export const makeCreateAdminController = () => {
  const adminRepo = new PrismaAdminRepository()
  const useCase = new CreateAdminUseCase(adminRepo)
  return new CreateAdminController(useCase)
}