import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "@/graphql/user/user.service";
import { I18n, I18nContext } from "nestjs-i18n";
import { I18nTranslations } from "@/types/generated/i18n.generated";
import { GuestModel } from "@/types/models/guest.model";
import { GuestUpdateInputModel } from "@/types/models/inputs/guest_update.input";
import { UseGuards } from "@nestjs/common";
import { UserAuthGuard } from "@/graphql/auth/guards/user_auth.guard";
import { UserID } from "@/common/decorators/user_id.decorator";
import { UserId } from "@/types/common/ids.type";

@Resolver(() => GuestModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [GuestModel], { name: "users" })
  async find_many(): Promise<GuestModel[]> {
    return this.userService.find_many();
  }

  @Query(() => Int, { name: "users_count" })
  async users_count(): Promise<number> {
    return this.userService.count();
  }

  @UseGuards(UserAuthGuard)
  @Query(() => GuestModel, {
    name: "user",
  })
  async find_by_id(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: UserId,
  ): Promise<GuestModel | null> {
    return this.userService.find_by_id({ i18n, user_id });
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => GuestModel, { name: "user_update" })
  async update(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: UserId,
    @Args({
      name: "user_update_input_data",
      type: () => GuestUpdateInputModel,
    })
    user_update_input_data: GuestUpdateInputModel,
  ): Promise<GuestModel | null> {
    return this.userService.update(user_update_input_data, {
      i18n,
      user_id,
    });
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => GuestModel, { name: "user_delete" })
  async delete(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: UserId,
  ): Promise<GuestModel | null> {
    return this.userService.delete({ i18n, user_id });
  }
}
