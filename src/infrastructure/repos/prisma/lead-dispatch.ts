import { randomUUID } from "node:crypto";

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
        treatments: {
          createMany: {
            data: leadDispatch.treatments.map(treatment => ({
              id: randomUUID(),
              treatment_id: treatment.id
            }))
          }
        },
        message_sent: leadDispatch.message_sent,
        created_at: leadDispatch.created_at
      }
    })
  }
}