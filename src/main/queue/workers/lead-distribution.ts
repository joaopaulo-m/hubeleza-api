import { Worker } from 'bullmq';

import { redisConnection } from '../../../infrastructure/services/queue/redis-connection';
import { makeSendLeadToPartnerUseCase } from '../../factories/lead/send-to-partner';

export const processSaleWorker = new Worker(
  'lead-distribution',
  async (job) => {
    if (job.name === "send_lead_to_partner") {
      console.log("Processing lead distribution job: ", job.id);

      const { 
        lead_id,
        partner_id,
        treatment_ids,
      } = job.data;
      const useCase = makeSendLeadToPartnerUseCase();

      const result = await useCase.execute({
        lead_id,
        partner_id,
        treatment_ids,
      })

      if (result instanceof Error) {
        throw result;
      }
    }
  },
  {
    connection: redisConnection,
  }
);