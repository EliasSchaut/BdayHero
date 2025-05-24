import { Field, ObjectType } from '@nestjs/graphql';
import { SlotModel } from '@/types/models/slot.model';
import { Shift, ShiftInfo } from '@prisma/client';

@ObjectType({
  description:
    'Represents a shift on a server, which holds multiple slots for participants to acquire.',
})
export class ShiftModel {
  constructor(shift: Shift & { shift_info: ShiftInfo[] }) {
    this.id = shift.id;
    this.name = shift.shift_info[0].name;
    this.desc = shift.shift_info[0].desc;
    this.slots = [];
  }

  @Field(() => Number)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  desc!: string;

  @Field(() => [SlotModel])
  slots!: SlotModel[];
}
