export interface SendEmailProps {
  subject: string
  email: string
  content: string
}

export interface IEmailService {
  sendEmail: (props: SendEmailProps) =>  Promise<Error | void>
}