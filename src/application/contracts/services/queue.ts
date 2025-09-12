export interface QueueJob {
  name: string;
  data: Record<string, any>;
  delay?: number
}

export interface IQueueService {
  add(job: QueueJob): Promise<void>;
}