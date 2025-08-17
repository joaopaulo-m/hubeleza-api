import type { IInviteTokenRepository } from "../../contracts/repos/invite-token";
import type { InviteTokenDto } from "../../dtos/invite-token";
import { InviteTokenMapper } from "../../mappers/invite-token";

export class GetAllInviteTokensUseCase {
  constructor(
    private readonly inviteTokenRepo: IInviteTokenRepository
  ){}

  async execute(): Promise<InviteTokenDto[]> {
    const tokens = await this.inviteTokenRepo.getAll()

    return tokens.map(InviteTokenMapper.toDto)
  }
}