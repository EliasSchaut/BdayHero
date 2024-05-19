import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@/graphql/auth/auth.service';
import { AuthModel } from '@/types/models/auth.model';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { UserModel } from '@/types/models/user.model';
import { UserInputModel } from '@/types/models/inputs/user.input';
import { PrismaService } from 'nestjs-prisma';
import { Logger } from '@nestjs/common';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => AuthModel, { name: 'auth_sign_in' })
  async sign_in(
    @Args('challenge') challenge: string,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<AuthModel> {
    return await this.authService.sign_in(challenge, {
      i18n,
    });
  }

  @Mutation(() => AuthModel, { name: 'auth_register' })
  async register(
    @Args('user_input_data') user_input_data: UserInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<AuthModel | null> {
    return await this.authService.register(user_input_data, {
      i18n,
    });
  }

  @Mutation(() => UserModel, { name: 'auth_verify' })
  async verify(
    @Args('challenge') challenge: string,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<UserModel | null> {
    return await this.authService.verify(challenge, { i18n });
  }
}
