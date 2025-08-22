export interface CreateWalletProps {
  name: string
  document: string
  phone_number: string
}

export interface CreateWalletReturn {
  wallet_id: string
}

export interface GeneratePixPaymentProps {
  wallet_id: string
  amount: number
}

export interface GeneratePixPaymentReturn {
  transaction_id: string
  qr_code: string
  pix_copy_paste_code: string
}

export interface IPaymentService {
  createWallet: (props: CreateWalletProps) => Promise<Error | CreateWalletReturn>
  generatePixPayment: (props: GeneratePixPaymentProps) => Promise<Error | GeneratePixPaymentReturn>
  getTotalBalance: () => Promise<number>
}