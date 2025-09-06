import type { InviteToken } from "../../../domain/entities/invite-token";
import type { FetchInviteTokensDto } from "../../use-cases/invite-token/get-all";

export interface IInviteTokenRepository {
  findById: (id: string) => Promise<null | InviteToken>
  findByToken: (token: string) => Promise<null | InviteToken>
  getAll: (props?: FetchInviteTokensDto) => Promise<InviteToken[]>
  create: (inviteToken: InviteToken) => Promise<void>
  delete: (id: string) => Promise<void>
}