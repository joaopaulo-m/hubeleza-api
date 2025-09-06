import { GetInviteTokenByTokenUseCase } from "../../../application/use-cases/invite-token/get-by-token"
import { GetInviteTokenByTokenController } from "../../../infrastructure/controllers/invite-token/get-by-token"
import { PrismaInviteTokenRepository } from "../../../infrastructure/repos/prisma/invite-token"

export const makeGetInviteTokenByTokenController = () => {
  const inviteTokenRepo = new PrismaInviteTokenRepository()
  const useCase = new GetInviteTokenByTokenUseCase(inviteTokenRepo)
  return new GetInviteTokenByTokenController(useCase)
}