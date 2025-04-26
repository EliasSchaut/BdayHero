import { Injectable } from '@nestjs/common';
import nodemailer, { SentMessageInfo, TransportOptions } from 'nodemailer';
import { DangerException } from '@/common/exceptions/danger.exception';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    } as TransportOptions);
  }

  async send({
    dest_mail,
    subject,
    text,
  }: {
    text: string;
    dest_mail: string;
    subject?: string;
  }): Promise<SentMessageInfo> {
    try {
      return await this.transporter.sendMail({
        from: `"${process.env.PROJ_TITLE}" <${process.env.EMAIL_HOST_USER}>`,
        to: dest_mail,
        subject: `[${process.env.PROJ_TITLE}]` + subject ? ` ${subject}` : '',
        text,
      });
    } catch (e) {
      throw new DangerException("Can't send email", e);
    }
  }
}
