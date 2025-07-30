import type { LeadDispatch } from "../../../domain/entities/lead-dispatch";

export interface ILeadDispatchRepository {
  create: (leadDispatch: LeadDispatch) => Promise<void>
}