import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy as GithubStrategy } from 'passport-github2';
import { UserService } from '@/graphql/user/user.service';
import { GuestModel } from '@/types/models/guest.model';
import { DangerException } from '@/common/exceptions/danger.exception';
import { AuthStrategyInterface } from '@/graphql/auth/strategies/auth_strategy.interface';
import { Request } from 'express';

@Injectable()
export class GithubAuthStrategy
  extends PassportStrategy(GithubStrategy)
  implements AuthStrategyInterface
{
  name = 'github';

  constructor(private readonly guestService: UserService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: `${process.env.AUTH_CALLBACK_BASE}/github` as string,
      scope: ['user:email'],
    });
  }

  authenticate(req: Request): void {
    return GithubStrategy.prototype.authenticate.call(this, req, {
      session: false,
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
