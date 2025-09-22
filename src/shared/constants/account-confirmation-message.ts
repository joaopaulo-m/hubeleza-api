interface AccountConfirmationMessageProps {
  partner_name: string
  transaction_id: string
}

export const ACCOUNT_CONFIRMATION_MESSAGE = (props: AccountConfirmationMessageProps) => `
  Olá, ${props.partner_name}! 👋 Estamos quase la!! 🚀
  Notamos que você preencheu o formulário da *Hubeleza* mas ainda não finalizou a recarga.
  Sem ela, não conseguimos ativar sua conta para envio de leads.

  O QR Code de pagamento está disponível por mais alguns minutos ⏳.

  👉 Clique no botão abaixo e finalize em menos de 1 minuto:
  https://panel.hubeleza.com.br/pay?transaction_id=${props.transaction_id}

  Comece agora a transformar oportunidades em clientes.
`