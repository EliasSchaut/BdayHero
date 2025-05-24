import { Field, ObjectType } from '@nestjs/graphql';
import { GuestModel } from '@/types/models/guest.model';
import { GuestShift, ShiftSlot } from '@prisma/client';

@ObjectType({
  description:
    'Represents a time slot for a shift, which can be acquired by multiple participants.',
})
export class SlotModel {
  constructor(slot: ShiftSlot & { acquired_shifts: GuestShift[] }) {
    this.id = slot.id;
    this.start = slot.start;
    this.end = slot.end;
    this.num_of_participants = slot.num_of_participants;
    this.num_acquired = slot.acquired_shifts.length;
  }

  @Field(() => String, {})
  id!: number;

  @Field(() => Date, {})
  start!: Date;

  @Field(() => Date, {})
  end!: Date;

  @Field(() => Number, {
    description: 'Number of participants that can be assigned to this slot.',
    nullable: true,
  })
  num_of_participants?: number;

  @Field(() => Number, {
    description:
      'Number of acquired slots, than has has be assigned to participants.',
    nullable: true,
  })
  num_acquired?: number;

  @Field(() => [GuestModel], {
    nullable: true,
  })
  assigned_guests?: GuestModel[];
}
