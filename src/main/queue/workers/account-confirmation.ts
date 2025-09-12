import { Worker } from 'bullmq';

import { redisConnection } from '../../../infrastructure/services/queue/redis-connection';
import { makeVerifyPartnerConfirmationUseCase } from '../../factories/partner/verify-confirmation';

export const accountConfirmationWorker = new Worker(
  'account_confirmation',
  async (job) => {
    if (job.name === "verify_account_confirmation") {
      console.log("Processing account confirmation job: ", job.id);

      const { 
        transaction_id,
        partner_id
      } = job.data;
      const useCase = makeVerifyPartnerConfirmationUseCase();

      const result = await useCase.execute({
        transaction_id,
        partner_id
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