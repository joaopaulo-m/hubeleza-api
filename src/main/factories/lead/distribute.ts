import { AddAffiliateComissionUseCase } from "../../../application/use-cases/affiliate/add-comission"
import { DistributeLeadUseCase } from "../../../application/use-cases/lead/distribute"
import { DistributeLeadController } from "../../../infrastructure/controllers/lead/distribute"
import { PrismaAffiliateRepository } from "../../../infrastructure/repos/prisma/affiliate"
import { PrismaFormRepository } from "../../../infrastructure/repos/prisma/form"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { BullMQQueueService } from "../../../infrastructure/services/queue/bullmq"
import { makeAddAffiliateComissionUseCase } from "../affiliate/add-comission"
import { makeCreateLeadUseCase } from "./create"

export const makeDistributeLeadController = () => {
  const formRepo = new PrismaFormRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const affiliateRepo = new PrismaAffiliateRepository()
  const queueService = new BullMQQueueService("lead-distribution");
  const createLeadUseCase = makeCreateLeadUseCase()
  const addAffiliateComissionUseCase = makeAddAffiliateComissionUseCase()
  const useCase = new DistributeLeadUseCase(
    formRepo, 
    partnerRepo,
    affiliateRepo,
    queueService,
    createLeadUseCase,
    addAffiliateComissionUseCase
  )
  return new DistributeLeadController(useCase)
}