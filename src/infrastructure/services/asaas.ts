import axios from 'axios'

import type { CreateWalletProps, CreateWalletReturn, GeneratePixPaymentProps, GeneratePixPaymentReturn, IPaymentService } from "../../application/contracts/services/payment";

export class AsaasPaymentService implements IPaymentService {
  private readonly accessToken: string
  
  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async createWallet(props: CreateWalletProps): Promise<Error | CreateWalletReturn> {
    try {
      const response = await axios.post("https://api-sandbox.asaas.com/v3/customers", {
        name: props.name,
        cpfCnpj: props.document,
        mobilePhone: props.phone_number,
      }, {
        headers: {
          'Content-Type': "application/json",
          'User-Agent': "hubeleza-api",
          access_token: this.accessToken
        }
      })

      return {
        wallet_id: response.data.id
      }
    } catch (error) {
      return error as Error
    }
  }

  async generatePixPayment(props: GeneratePixPaymentProps): Promise<Error | GeneratePixPaymentReturn> {
    try {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const formatted = tomorrow.toISOString().split('T')[0];

      const createResult = await axios.post("https://api-sandbox.asaas.com/v3/payments", {
        billingType: "PIX",
        customer: props.wallet_id,
        value: Number((props.amount / 100).toFixed(2)),
        dueDate: formatted
      }, {
        headers: {
          'Content-Type': "application/json",
          'User-Agent': "hubeleza-api",
          access_token: this.accessToken
        }
      })

      const transaction_id = createResult.data.id

      const getPixDataResult = await axios.get(`https://api-sandbox.asaas.com/v3/payments/${transaction_id}/pixQrCode`,
        {
          headers: {
            'Content-Type': "application/json",
            'User-Agent': "hubeleza-api",
            access_token: this.accessToken
          }
        }
      )

      return {
        transaction_id,
        qr_code: getPixDataResult.data.encodedImage,
        pix_copy_paste_code: getPixDataResult.data.payload,
      }
    } catch (error) {
      return error as Error
    }
  }

  async getTotalBalance(): Promise<number> {
    try {
      const response = await axios.get("https://api-sandbox.asaas.com/v3/finance/balance", {
        headers: {
          'Content-Type': "application/json",
          'User-Agent': "hubeleza-api",
          access_token: this.accessToken
        }
      })

      return response.data.balance
    } catch (error) {
      console.error("Error fetching balance: ", error)
      return 0
    }
  }
}