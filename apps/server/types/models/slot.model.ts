import { Field, ObjectType } from '@nestjs/graphql';
import { GuestModel } from '@/types/models/guest.model';
import { Guest, GuestShift, ShiftSlot } from '@prisma/client';
import { SlotModel as ISlotModel } from '@bdayhero/shared';

@ObjectType({
  description:
    'Represents a time slot for a shift, which can be acquired by multiple participants.',
})
export class SlotModel implements ISlotModel {
  constructor(
    slot: ShiftSlot & {
      assigned_guests?: Array<GuestShift & { guest: Guest }>;
    },
  ) {
    Object.assign(this, slot);
    if (slot.assigned_guests) {
      this.assigned_guests = slot.assigned_guests.map((shift_guest) =>
        new GuestModel(shift_guest.guest).anonymise_if_not_public(),
      );
    }
  }

  @Field(() => String)
  id!: number;

  @Field(() => Date)
  start!: Date;

  @Field(() => Date)
  end!: Date;

  @Field(() => Number)
  capacity!: number;

  @Field(() => [GuestModel], {
    nullable: true,
  })
  assigned_guests?: GuestModel[];
}
