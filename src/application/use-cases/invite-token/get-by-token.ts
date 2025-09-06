import type { IInviteTokenRepository } from "../../contracts/repos/invite-token";
import type { InviteTokenDto } from "../../dtos/invite-token";
import { InviteTokenMapper } from "../../mappers/invite-token";

export class GetInviteTokenByTokenUseCase {
  constructor(
    private readonly inviteTokenRepo: IInviteTokenRepository
  ){}

  async execute(token: string): Promise<Error | InviteTokenDto> {
    const inviteToken = await this.inviteTokenRepo.findByToken(token)

    if (!inviteToken) {
      return new Error("Invite token not found")
    }

    return InviteTokenMapper.toDto(inviteToken)
  }
}