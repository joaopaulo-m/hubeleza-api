import { DeleteAdminUseCase } from "../../../application/use-cases/admin/delete"
import { DeleteAdminController } from "../../../infrastructure/controllers/admin/delete"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"

export const makeDeleteAdminController = () => {
  const adminRepo = new PrismaAdminRepository()
  const useCase = new DeleteAdminUseCase(adminRepo)
  return new DeleteAdminController(useCase)
}