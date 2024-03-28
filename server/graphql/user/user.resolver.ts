import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '@/graphql/user/user.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { UserModel } from '@/types/models/user.model';
import { UserID } from '@/common/decorators/user_id.decorator';
import { UserUpdateInputModel } from '@/types/models/inputs/user_update.input';
import { Role } from '@/common/decorators/role.decorator';
import { RoleEnum } from '@/types/enums/role.enum';
import { NewsletterInputModel } from '@/types/models/inputs/newsletter.input';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Boolean, {
    name: 'subscribe',
  })
  async subscribe(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Args('newsletter_input') newsletter_input: NewsletterInputModel,
  ): Promise<boolean> {
    return this.userService.subscribe(newsletter_input.email, { i18n });
  }

  @Query(() => Boolean, {
    name: 'unsubscribe',
  })
  async unsubscribe(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Args('newsletter_input') newsletter_input: NewsletterInputModel,
  ): Promise<boolean> {
    return this.userService.unsubscribe(newsletter_input.email, { i18n });
  }

  @Role(RoleEnum.USER)
  @Query(() => UserModel, {
    name: 'user',
  })
  async user(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: string,
  ): Promise<UserModel | null> {
    return this.userService.find_by_id({ i18n, user_id });
  }

  @Role(RoleEnum.USER)
  @Mutation(() => UserModel, { name: 'user_update' })
  async user_update(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: string,
    @Args({
      name: 'user_update_input_data',
      type: () => UserUpdateInputModel,
    })
    user_update_input_data: UserUpdateInputModel,
  ): Promise<UserModel | null> {
    return this.userService.update(user_update_input_data, {
      i18n,
      user_id,
    });
  }

  @Role(RoleEnum.USER)
  @Mutation(() => UserModel, { name: 'user_delete' })
  async user_delete(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: string,
  ): Promise<UserModel | null> {
    return this.userService.delete({ i18n, user_id });
  }
}
