import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ShiftModel } from '@/types/models/shift.model';
import { SlotModel } from '@/types/models/slot.model';
import { ShiftService } from '@/graphql/shift/shift.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from '@/graphql/auth/guards/user_auth.guard';
import { UserID } from '@/common/decorators/user_id.decorator';
import { UserId } from '@/types/common/ids.type';
import { IdInputModel } from '@/types/models/inputs/id.input';

@Resolver(() => ShiftModel)
export class ShiftResolver {
  constructor(private readonly shiftService: ShiftService) {}

  @Query(() => [ShiftModel], { name: 'shifts' })
  async find_many(
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ShiftModel[]> {
    return this.shiftService.find_many({ i18n });
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => SlotModel, { name: 'assign_slot' })
  async assign_slot(
    @Args({ name: 'slot_id_input' }) id_input: IdInputModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
    @UserID() user_id: UserId,
  ): Promise<SlotModel> {
    return this.shiftService.assign_slot(user_id, id_input.id, { i18n });
  }

  @ResolveField(() => [SlotModel], { name: 'slots' })
  async find_slots(
    @Parent() shift: ShiftModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<SlotModel[]> {
    return await this.shiftService.find_shift_slots(shift.id, {
      i18n,
    });
  }
}
