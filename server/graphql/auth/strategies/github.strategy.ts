import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy as GithubStrategy } from 'passport-github2';
import { UserService } from '@/graphql/user/user.service';
import { GuestModel } from '@/types/models/guest.model';
import { DangerException } from '@/common/exceptions/danger.exception';
import { I18nGqlResolver } from '@/common/middleware/i18n.resolver';

@Injectable()
export class GithubAuthStrategy extends PassportStrategy(GithubStrategy) {
  constructor(
    private readonly guestService: UserService,
    private readonly i18n: I18nGqlResolver,
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
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
      throw new DangerException('GithubAuthStrategy could not found mail');
    return await this.guestService.find_by_email(email);
  }
}
