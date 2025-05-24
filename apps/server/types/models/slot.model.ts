import { Field, ObjectType } from '@nestjs/graphql';
import { GuestModel } from '@/types/models/guest.model';
import { Guest, GuestShift, ShiftSlot } from '@prisma/client';

@ObjectType({
  description:
    'Represents a time slot for a shift, which can be acquired by multiple participants.',
})
export class SlotModel {
  constructor(
    slot: ShiftSlot & {
      assigned_guests?: Array<GuestShift & { guest: Guest }>;
    },
  ) {
    Object.assign(this, slot);
    if (slot.assigned_guests) {
      this.assigned_guests = slot.assigned_guests.map(
        (shift_guest) => new GuestModel(shift_guest.guest),
      );
    }
  }

  @Field(() => String, {})
  id!: number;

  @Field(() => Date, {})
  start!: Date;

  @Field(() => Date, {})
  end!: Date;

  @Field(() => Number, {
    nullable: true,
  })
  capacity?: number;

  @Field(() => [GuestModel], {
    nullable: true,
  })
  assigned_guests?: GuestModel[];
}
