import { GetAllAdminsUseCase } from "../../../application/use-cases/admin/get-all"
import { GetAllAdminsController } from "../../../infrastructure/controllers/admin/get-all"
import { PrismaAdminRepository } from "../../../infrastructure/repos/prisma/admin"

export const makeGetAllAdminsController = () => {
  const adminRepo = new PrismaAdminRepository()
  const useCase = new GetAllAdminsUseCase(adminRepo)
  return new GetAllAdminsController(useCase)
}