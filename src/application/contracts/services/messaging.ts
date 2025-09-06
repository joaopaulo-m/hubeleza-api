export type SendMessageProps = {
  phone_number: string;
  message: string
}

export type SendDocumentProps = {
  phone_number: string
  document_base64: string
  document_name: string
  mimetype: string
  caption: string
}

export interface IMessagingService {
  sendMessage(props: SendMessageProps): Promise<Error | void>;
  sendDocument(props: SendDocumentProps): Promise<Error | void>;
}