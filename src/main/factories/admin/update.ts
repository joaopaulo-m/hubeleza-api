import { UpdateAdminUseCase } from "../../../application/use-cases/admin/update"
import { UpdateAdminController } from "../../../infrastructure/controllers/admin/update"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"

export const makeUpdateAdminController = () => {
  const adminRepo = new PrismaAdminRepository()
  const useCase = new UpdateAdminUseCase(adminRepo)
  return new UpdateAdminController(useCase)
}