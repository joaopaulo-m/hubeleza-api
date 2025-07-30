export type SendMessageProps = {
  phone_number: string;
  message: string
}

export interface IMessagingService {
  sendMessage(props: SendMessageProps): Promise<Error | void>;
}