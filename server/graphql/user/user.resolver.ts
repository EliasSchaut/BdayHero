import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '@/graphql/user/user.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { GuestModel } from '@/types/models/guest.model';
import { UserID } from '@/common/decorators/user_id.decorator';
import { GuestUpdateInputModel } from '@/types/models/inputs/guest_update.input';
import { Role } from '@/common/decorators/role.decorator';
import { RoleEnum } from '@/types/enum/role.enum';

@Resolver(() => GuestModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Role(RoleEnum.USER)
  @Query(() => GuestModel, {
    name: 'user',
  })
  async user(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: string,
  ): Promise<GuestModel | null> {
    return this.userService.find_by_id({ i18n, user_id });
  }

  @Role(RoleEnum.USER)
  @Mutation(() => GuestModel, { name: 'user_update' })
  async user_update(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: string,
    @Args({
      name: 'user_update_input_data',
      type: () => GuestUpdateInputModel,
    })
    user_update_input_data: GuestUpdateInputModel,
  ): Promise<GuestModel | null> {
    return this.userService.update(user_update_input_data, {
      i18n,
      user_id,
    });
  }

  @Role(RoleEnum.USER)
  @Mutation(() => GuestModel, { name: 'user_delete' })
  async user_delete(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: string,
  ): Promise<GuestModel | null> {
    return this.userService.delete({ i18n, user_id });
  }
}
