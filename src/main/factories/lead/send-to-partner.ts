import { SendLeadToParnterUseCase } from "../../../application/use-cases/lead/send-to-partner"
import { PrismaLeadRepository } from "../../../infrastructure/repos/prisma/lead"
import { PrismaLeadDispatchRepository } from "../../../infrastructure/repos/prisma/lead-dispatch"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTreatmentRepository } from "../../../infrastructure/repos/prisma/treatment"
import { EvolutionMessagingService } from "../../../infrastructure/services/evolution-api"

export const makeSendLeadToPartnerUseCase = () => {
  const leadRepo = new PrismaLeadRepository()
  const partnerRepo = new PrismaPartnerRepository()
  const treatmentRepo = new PrismaTreatmentRepository()
  const leadDispatchRepo = new PrismaLeadDispatchRepository()
  const messagingService = new EvolutionMessagingService(
    process.env.EVOLUTION_API_BASE_URL || "https://api.evolution.com",
    process.env.EVOLUTION_INSTANCE || "default-instance",
    process.env.EVOLUTION_TOKEN || ""
  )
  return new SendLeadToParnterUseCase(
    leadRepo,
    partnerRepo,
    treatmentRepo,
    leadDispatchRepo,
    messagingService
  )
}