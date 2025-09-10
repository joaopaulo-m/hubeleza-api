import nodemailer from 'nodemailer'

import type { IEmailService, SendEmailProps } from "../../application/contracts/services/email";

const nodemailerTransporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 587,
  secure: false, // true para 465
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD
  }
});


export class NodemailerService implements IEmailService {
  async sendEmail(props: SendEmailProps) {
    try {
      await nodemailerTransporter.sendMail({
        from: '"Hubeleza" <no-reply@hubeleza.com.br>',
        to: props.email,
        subject: props.subject,
        html: props.content
      });
    } catch (error) {
      return error as Error
    }
  }
}