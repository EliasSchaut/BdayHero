import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ShiftModel } from '@/types/models/shift.model';
import { SlotModel } from '@/types/models/slot.model';
import { ShiftsService } from '@/graphql/shifts/shifts.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';

@Resolver(() => ShiftModel)
export class ShiftsResolver {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Query(() => [ShiftModel])
  async shifts(
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ShiftModel[]> {
    return this.shiftsService.find_all_shifts({ i18n });
  }

  @ResolveField(() => [SlotModel])
  async slots(
    @Parent() shift: ShiftModel,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<SlotModel[]> {
    const slots = await this.shiftsService.find_all_slots(shift.id, {
      i18n,
    });
    await Promise.all(
      slots.map(async (slot) => {
        slot.assigned_guests =
          await this.shiftsService.find_all_assigned_guests(slot.id, {
            i18n,
          });
      }),
    );
    return slots;
  }
}
