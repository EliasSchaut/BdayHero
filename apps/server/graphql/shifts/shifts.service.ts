import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { ShiftModel } from '@/types/models/shift.model';
import { SlotModel } from '@/types/models/slot.model';
import { PrismaService } from 'nestjs-prisma';
import { GuestModel } from '@/types/models/guest.model';

@Injectable()
export class ShiftsService {
  constructor(private readonly prisma: PrismaService) {}

  async find_all_shifts(ctx: CtxType): Promise<ShiftModel[]> {
    return (
      await this.prisma.shift.findMany({
        include: {
          shift_info: {
            where: { lang: ctx.i18n.lang },
          },
        },
        orderBy: { order: 'asc' },
      })
    ).map((shift) => new ShiftModel(shift));
  }

  async find_all_slots(shift_id: number, ctx: CtxType): Promise<SlotModel[]> {
    const shift = await this.prisma.shift.findFirst({
      where: { id: shift_id },
      include: {
        shift_slots: {
          orderBy: { start: 'asc' },
          include: {
            acquired_shifts: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    });
    return shift!.shift_slots.map((slot) => new SlotModel(slot));
  }

  async find_all_assigned_guests(
    slot_id: number,
    ctx: CtxType,
  ): Promise<GuestModel[]> {
    return (
      await this.prisma.guestShift.findMany({
        where: { shift_slot_id: slot_id },
        select: {
          guest: true,
        },
      })
    ).map((slot) => new GuestModel(slot.guest));
  }
}
