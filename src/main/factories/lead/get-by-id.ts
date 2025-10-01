import { GetLeadByIdUseCase } from "../../../application/use-cases/lead/get-by-id"
import { GetLeadByIdController } from "../../../infrastructure/controllers/lead/get-by-id"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"

export const makeGetLeadByIdController = () => {
  const leadRepo = new PrismaLeadRepository()
  const useCase = new GetLeadByIdUseCase(leadRepo)
  return new GetLeadByIdController(useCase)
}