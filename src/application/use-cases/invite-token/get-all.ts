import type { IInviteTokenRepository } from "../../contracts/repos/invite-token";
import type { InviteTokenDto } from "../../dtos/invite-token";
import { InviteTokenMapper } from "../../mappers/invite-token";

export interface FetchInviteTokensDto {
  operator_id?: string
  name?: string
  start_date?: number
  end_date?: number
}

export class GetAllInviteTokensUseCase {
  constructor(
    private readonly inviteTokenRepo: IInviteTokenRepository
  ){}

  async execute(props: FetchInviteTokensDto): Promise<InviteTokenDto[]> {
    const tokens = await this.inviteTokenRepo.getAll(props)

    return tokens.map(InviteTokenMapper.toDto)
  }
}