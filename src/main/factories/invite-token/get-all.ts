import { GetAllInviteTokensUseCase } from "../../../application/use-cases/invite-token/get-all"
import { GetAllInviteTokensController } from "../../../infrastructure/controllers/invite-token/get-all"
import { PrismaInviteTokenRepository } from "../../../infrastructure/repos/prisma/invite-token"

export const makeGetAllInviteTokensController = () => {
  const inviteTokenRepo = new PrismaInviteTokenRepository()
  const useCase = new GetAllInviteTokensUseCase(inviteTokenRepo)
  return new GetAllInviteTokensController(useCase)
}