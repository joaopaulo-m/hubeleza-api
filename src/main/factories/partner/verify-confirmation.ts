import { VerifyPartnerConfirmationUseCase } from "../../../application/use-cases/partner/verify-confirmation"
import { PrismaPartnerRepository } from "../../../infrastructure/repos/prisma/partner"
import { PrismaTransactionRepository } from "../../../infrastructure/repos/prisma/transaction"
import { EvolutionMessagingService } from "../../../infrastructure/services/evolution-api"
import { NodemailerService } from "../../../infrastructure/services/nodemailer"

export const makeVerifyPartnerConfirmationUseCase = () => {
  const partnerRepo = new PrismaPartnerRepository()
  const transactionRepo = new PrismaTransactionRepository()
  const emailService = new NodemailerService()
  const messagingService = new EvolutionMessagingService(
    process.env.EVOLUTION_API_BASE_URL || "https://api.evolution.com",
    process.env.EVOLUTION_INSTANCE || "default-instance",
    process.env.EVOLUTION_TOKEN || ""
  )
  return new VerifyPartnerConfirmationUseCase(
    partnerRepo,
    transactionRepo,
    emailService,
    messagingService
  )
}