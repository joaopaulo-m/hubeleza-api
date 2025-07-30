import type { ILeadDispatchRepository } from "../../../application/contracts/repos/lead-dispatch";
import type { LeadDispatch } from "../../../domain/entities/lead-dispatch";
import { prisma } from "../../services/prisma";

export class PrismaLeadDispatchRepository implements ILeadDispatchRepository {
  async create(leadDispatch: LeadDispatch) {
    await prisma.leadDispatch.create({
      data: {
        id: leadDispatch.id,
        lead_id: leadDispatch.lead.id,
        partner_id: leadDispatch.partner.id,
        treatment_id: leadDispatch.treatment.id,
        message_sent: leadDispatch.message_sent,
        created_at: leadDispatch.created_at
      }
    })
  }
}