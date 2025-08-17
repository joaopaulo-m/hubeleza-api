import { CreateFirstAdminUseCase } from "../../../application/use-cases/admin/create-first"
import { CreateFirstAdminController } from "../../../infrastructure/controllers/admin/create-first"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"

export const makeCreateFirstAdminController = () => {
  const adminRepo = new PrismaAdminRepository()
  const useCase = new CreateFirstAdminUseCase(adminRepo)
  return new CreateFirstAdminController(useCase)
}