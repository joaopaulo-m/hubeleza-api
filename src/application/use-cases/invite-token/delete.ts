import type { IInviteTokenRepository } from "../../contracts/repos/invite-token";

export class DeleteInviteTokenUseCase {
  constructor(
    private readonly inviteTokenRepo: IInviteTokenRepository
  ){}

  async execute(invite_token_id: string): Promise<Error | void> {
    const inviteToken = await this.inviteTokenRepo.findById(invite_token_id)

    if (!inviteToken) {
      return new Error("Invite token not found")
    }

    await this.inviteTokenRepo.delete(inviteToken.id)
    return void 0;
  }
}