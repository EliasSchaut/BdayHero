import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { ShiftModel } from '@/types/models/shift.model';
import { SlotModel } from '@/types/models/slot.model';
import { PrismaService } from 'nestjs-prisma';
import { Lang } from '@bdayhero/shared/types/enums/lang.enum';
import { UserId } from '@/types/common/ids.type';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async find_many(ctx: CtxType): Promise<ShiftModel[]> {
    return (
      await this.prisma.shift.findMany({
        include: {
          shift_info: {
            where: { lang: ctx.i18n.lang as Lang },
          },
        },
        orderBy: { order: 'asc' },
      })
    ).map((shift) => new ShiftModel(shift));
  }

  async assign_slot(
    guest_id: UserId,
    slot_id: number,
    ctx: CtxType,
  ): Promise<SlotModel> {
    await this.prisma.guestShift.upsert({
      where: {
        guest_id_shift_slot_id: {
          guest_id,
          shift_slot_id: slot_id,
        },
      },
      include: {
        guest: true,
      },
      update: {},
      create: {
        guest_id: guest_id,
        shift_slot_id: slot_id,
      },
    });
    return this.find_slot(slot_id, ctx);
  }

  async find_shift_slots(shift_id: number, ctx: CtxType): Promise<SlotModel[]> {
    const shift = await this.prisma.shift.findFirst({
      where: { id: shift_id },
      include: {
        shift_slots: {
          orderBy: { start: 'asc' },
          include: {
            assigned_guests: {
              include: {
                guest: true,
              },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    });
    return shift!.shift_slots.map((slot) => new SlotModel(slot));
  }

  async find_slot(slot_id: number, ctx: CtxType): Promise<SlotModel> {
    const slot = await this.prisma.shiftSlot.findFirst({
      where: { id: slot_id },
      orderBy: { start: 'asc' },
      include: {
        assigned_guests: {
          include: {
            guest: true,
          },
        },
      },
    });
    return new SlotModel(slot!);
  }
}
