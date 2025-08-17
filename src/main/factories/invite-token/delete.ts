import { DeleteInviteTokenUseCase } from "../../../application/use-cases/invite-token/delete"
import { DeleteInviteTokenController } from "../../../infrastructure/controllers/invite-token/delete"
import { PrismaInviteTokenRepository } from "../../../infrastructure/repos/prisma/invite-token"

export const makeDeleteInviteTokenController = () => {
  const inviteTokenRepo = new PrismaInviteTokenRepository()
  const useCase = new DeleteInviteTokenUseCase(inviteTokenRepo)
  return new DeleteInviteTokenController(useCase)
}