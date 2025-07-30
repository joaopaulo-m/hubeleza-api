import axios from 'axios';

import type { SendMessageProps, IMessagingService } from "../../application/contracts/services/messaging";

export class EvolutionMessagingService implements IMessagingService {
  private readonly baseUrl: string;
  private readonly instance: string;
  private readonly token: string;

  constructor(baseUrl: string, instance: string, token: string) {
    this.baseUrl = baseUrl;
    this.instance = instance;
    this.token = token;
  }

  async sendMessage(props: SendMessageProps): Promise<Error | void> {
    try {
      const { phone_number, message } = props;

      await axios.post(
        `${this.baseUrl}/message/sendText/${this.instance}`,
        {
          number: `+55${phone_number}`,
          text: message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            apikey: `${this.token}`,
          },
        }
      );
    } catch (error: any) {
      return new Error(error.response?.data?.message || 'Erro desconhecido ao enviar mensagem');
    }
  }
}
