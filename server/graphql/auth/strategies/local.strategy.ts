import { Injectable } from '@nestjs/common';
import { UserService } from '@/graphql/user/user.service';
import { EmailService } from '@/common/services/email.service';
import { AuthStrategyInterface } from '@/graphql/auth/strategies/auth_strategy.interface';
import { GuestModel } from '@/types/models/guest.model';
import { DangerException } from '@/common/exceptions/danger.exception';
import { SentMessageInfo } from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { UserPayloadType } from '@/types/common/user_payload.type';
import { I18nGqlResolver } from '@/common/middleware/i18n.resolver';

@Injectable()
export class LocalAuthStrategy implements AuthStrategyInterface {
  constructor(
    private readonly guestService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly i18n: I18nGqlResolver,
  ) {}

  name = 'magic-login';
  callback_base = process.env.AUTH_CALLBACK_BASE as string;

  async authenticate(email: string): Promise<void> {
    const payload = await this.jwtService.signAsync(
      { username: email } as UserPayloadType,
      {
        expiresIn: process.env.AUTH_TOKEN_EXPIRATION,
        secret: process.env.JWT_SECRET,
        privateKey: process.env.JWT_SECRET,
      },
    );
    const magic_link = new URL(payload, this.callback_base).toString();
    await this.send_magic_link(email, magic_link);
  }

  async validate(payload: string): Promise<GuestModel> {
    const { email } = await this.jwtService.verifyAsync(payload);
    if (!email)
      throw new DangerException(this.i18n.t('auth.exception.invalid_token'));
    return await this.guestService.find_by_email(email);
  }

  private async send_magic_link(
    destination: string,
    magic_link: string,
  ): Promise<SentMessageInfo> {
    return await this.emailService.send({
      dest_mail: destination,
      subject: this.i18n.t('common.mail.auth_local.subject') as string,
      text: `${this.i18n.t('common.mail.auth_local.text')}${magic_link}`,
    });
  }
}
