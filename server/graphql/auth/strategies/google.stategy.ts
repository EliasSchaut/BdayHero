import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as GoogleStategy } from 'passport-google-oauth20';
import { DangerException } from '@/common/exceptions/danger.exception';
import { GuestService } from '@/graphql/guest/guest.service';
import { GuestModel } from '@/types/models/guest.model';
import { AuthStrategyInterface } from '@/common/interfaces/auth_strategy.interface';

@Injectable()
export class GoogleAuthStrategy
  extends PassportStrategy(GoogleStategy)
  implements AuthStrategyInterface
{
  constructor(private readonly guestService: GuestService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<GuestModel> {
    const email = profile.emails[0].value;
    if (!email)
      throw new DangerException('GoogleAuthStrategy could not found mail');
    return await this.guestService.find_by_email(email);
  }
}
