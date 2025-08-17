import { InviteToken } from "../../../domain/entities/invite-token";
import type { IInviteTokenRepository } from "../../contracts/repos/invite-token";
import { InviteTokenMapper } from "../../mappers/invite-token";

export interface CreateInviteTokenDto {
  name: string
}

export class CreateInviteTokenUseCase {
  constructor(
    private readonly inviteTokenRepo: IInviteTokenRepository
  ){}

  async execute(props: CreateInviteTokenDto): Promise<Error | CreateInviteTokenDto> {
    const token = new InviteToken({
      name: props.name
    })

    await this.inviteTokenRepo.create(token)
    return InviteTokenMapper.toDto(token)
  }
}