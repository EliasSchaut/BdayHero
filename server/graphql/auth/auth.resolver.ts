import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@/graphql/auth/auth.service';
import { SignedInModel } from '@/types/models/signed_in.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { SignInInput } from '@/types/models/inputs/sign_in.input';

@Resolver(() => SignedInModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => SignedInModel, { name: 'auth_sign_in' })
  async sign_in(
    @Args('user_sign_in_input') user_sign_in_input: SignInInput,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<SignedInModel> {
    return await this.authService.sign_in(user_sign_in_input, {
      i18n,
    });
  }
}
