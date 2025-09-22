export interface QueueJob<T> {
  name: string;
  data: T;
  delay?: number
}

export interface IQueueService {
  add<T = any>(job: QueueJob<T>): Promise<void>;
}