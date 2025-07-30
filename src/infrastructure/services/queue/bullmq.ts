import { Queue } from 'bullmq';

import type { IQueueService, QueueJob } from '../../../application/contracts/services/queue';
import { redisConnection } from './redis-connection';

export class BullMQQueueService implements IQueueService {
  private queue: Queue;

  constructor(queueName: string) {
    this.queue = new Queue(queueName, {
      connection: redisConnection,
    });
  }

  async add(job: QueueJob): Promise<void> {
    await this.queue.add(job.name, job.data);
  }
}
