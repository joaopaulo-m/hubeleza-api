export interface QueueJob {
  name: string;
  data: Record<string, any>;
}

export interface IQueueService {
  add(job: QueueJob): Promise<void>;
}