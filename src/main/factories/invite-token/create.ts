import { CreateInviteTokenUseCase } from "../../../application/use-cases/invite-token/create"
import { CreateInviteTokenController } from "../../../infrastructure/controllers/invite-token/create"
import { PrismaInviteTokenRepository } from "../../../infrastructure/repos/prisma/invite-token"

export const makeCreateInviteTokenController = () => {
  const inviteTokenRepo = new PrismaInviteTokenRepository()
  const useCase = new CreateInviteTokenUseCase(inviteTokenRepo)
  return new CreateInviteTokenController(useCase)
}