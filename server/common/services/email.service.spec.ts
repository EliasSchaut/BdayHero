import { EmailService } from '@/common/services/email.service';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('EmailService', () => {
  let emailService: EmailService;
  let sendMailMock: jest.Mock;

  beforeAll(() => {
    sendMailMock = jest.fn();
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });
    emailService = new EmailService();
  });

  describe('send_verify', () => {
    it('sends verification email with correct details', async () => {
      await emailService.send({
        dest_mail: 'test@example.com',
        subject: 'Confirm your email!',
        text: 'Hello testuser,\n\nplease confirm your email by clicking the following link:\nhttp://example.com/verify\n\nDear\nTestServer Team\n',
      });
      expect(sendMailMock).toHaveBeenCalledWith({
        from: '"TestServer" <noreply@schaut.dev>',
        to: 'test@example.com',
        subject: '[TestServer] Confirm your email!',
        text: 'Hello testuser,\n\nplease confirm your email by clicking the following link:\nhttp://example.com/verify\n\nDear\nTestServer Team\n',
      });
    });
  });
});
