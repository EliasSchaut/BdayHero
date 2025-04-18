import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@/graphql/auth/auth.service';
import { SignedInModel } from '@/types/models/signed_in.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { SignInInputModel } from '@/types/models/inputs/sign_in.input';
import { EmailInputModel } from '@/types/models/inputs/email.input';

@Resolver(() => SignedInModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => SignedInModel, { name: 'auth_sign_in' })
  async sign_in(
    @Args('user_sign_in_input') user_sign_in_input: SignInInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<SignedInModel> {
    return await this.authService.sign_in(user_sign_in_input, {
      i18n,
    });
  }

  @Query(() => EmailInputModel, { name: 'auth_query_challenge' })
  async query_challenge(
    @Args('user_email_input') user_email_input: EmailInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<boolean> {
    return await this.authService.query_challenge(user_email_input.email, {
      i18n,
    });
  }
}
