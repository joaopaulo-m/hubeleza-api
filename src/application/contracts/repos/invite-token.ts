import type { InviteToken } from "../../../domain/entities/invite-token";

export interface IInviteTokenRepository {
  findById: (id: string) => Promise<null | InviteToken>
  findByToken: (token: string) => Promise<null | InviteToken>
  getAll: () => Promise<InviteToken[]>
  create: (inviteToken: InviteToken) => Promise<void>
  delete: (id: string) => Promise<void>
}