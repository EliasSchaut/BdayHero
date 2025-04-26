import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@/graphql/auth/auth.service';
import { SignedInModel } from '@/types/models/signed_in.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { EmailInputModel } from '@/types/models/inputs/email.input';
import { User } from '@/common/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { LocalAuthStrategy } from '@/graphql/auth/strategies/local.strategy';
import { LocalAuthGuard } from '@/graphql/auth/guards/local_auth.guard';
import { UserPayloadType } from '@/types/common/user_payload.type';

@Resolver(() => SignedInModel)
export class AuthResolver {
  constructor(
    private readonly emailAuthStrategy: LocalAuthStrategy,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Query(() => SignedInModel, { name: 'auth_sign_in_via_email' })
  async sign_in_local(
    @User() user: UserPayloadType,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<SignedInModel> {
    return await this.authService.sign_in_local(user.username, { i18n });
  }

  @Mutation(() => Boolean, { name: 'auth_sign_request_local' })
  async sign_in_request_local(
    @Args('user_mail_input') user_email_input: EmailInputModel,
  ): Promise<boolean> {
    await this.emailAuthStrategy.authenticate(user_email_input.email);
    return true;
  }
}
