import { GetAllLeadsUseCase } from "../../../application/use-cases/lead/get-all"
import { GetAllLeadsController } from "../../../infrastructure/controllers/lead/get-all"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"

export const makeGetAllLeadsController = () => {
  const leadRepo = new PrismaLeadRepository()
  const useCase = new GetAllLeadsUseCase(leadRepo)
  return new GetAllLeadsController(useCase)
}