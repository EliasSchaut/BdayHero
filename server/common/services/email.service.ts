import { Injectable } from '@nestjs/common';
import nodemailer, { TransportOptions } from 'nodemailer';
import * as process from 'node:process';

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
  }) {
    await this.transporter.sendMail({
      from: `"${process.env.PROJ_TITLE}" <${process.env.EMAIL_HOST_USER}>`,
      to: dest_mail,
      subject: `[${process.env.PROJ_TITLE}]` + subject ? ` ${subject}` : '',
      text,
    });
  }
}
