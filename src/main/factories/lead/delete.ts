import { DeleteLeadUseCase } from "../../../application/use-cases/lead/delete"
import { DeleteLeadController } from "../../../infrastructure/controllers/lead/delete"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"

export const makeDeleteLeadController = () => {
  const leadRepo = new PrismaLeadRepository()
  const useCase = new DeleteLeadUseCase(leadRepo)
  return new DeleteLeadController(useCase)
}