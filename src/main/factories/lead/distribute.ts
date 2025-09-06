import { DistributeLeadUseCase } from "../../../application/use-cases/lead/distribute"
import { DistributeLeadController } from "../../../infrastructure/controllers/lead/distribute"
import { PrismaFormRepository } from "../../../infrastructure/repos/prisma/form"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { BullMQQueueService } from "../../../infrastructure/services/queue/bullmq"
import { makeCreateLeadUseCase } from "./create"

export const makeDistributeLeadController = () => {
  const formRepo = new PrismaFormRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const queueService = new BullMQQueueService("lead-distribution");
  const createLeadUseCase = makeCreateLeadUseCase()
  const useCase = new DistributeLeadUseCase(
    formRepo, 
    partnerRepo,
    queueService,
    createLeadUseCase
  )
  return new DistributeLeadController(useCase)
}