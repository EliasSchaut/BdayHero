import { Field, ObjectType } from '@nestjs/graphql';
import { SlotModel } from '@/types/models/slot.model';
import { Shift, ShiftInfo } from '@prisma/client';
import { ShiftModel as IShiftModel } from '@bdayhero/shared';

@ObjectType({
  description:
    'Represents a shift on a server, which holds multiple slots for participants to acquire.',
})
export class ShiftModel implements IShiftModel {
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
