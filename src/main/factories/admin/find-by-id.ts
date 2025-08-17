import { FindAdminByIdUseCase } from "../../../application/use-cases/admin/find-by-id"
import { FindAdminByIdController } from "../../../infrastructure/controllers/admin/find-by-id"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"

export const makeFindAdminByIdController = () => {
  const adminRepo = new PrismaAdminRepository()
  const useCase = new FindAdminByIdUseCase(adminRepo)
  return new FindAdminByIdController(useCase)
}