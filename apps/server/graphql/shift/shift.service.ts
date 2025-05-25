import { Injectable } from '@nestjs/common';
import { CtxType } from '@/types/common/ctx.type';
import { ShiftModel } from '@/types/models/shift.model';
import { SlotModel } from '@/types/models/slot.model';
import { PrismaService } from 'nestjs-prisma';
import { Lang } from '@bdayhero/shared';
import { UserId } from '@/types/common/ids.type';
import { DangerException } from '@/common/exceptions/danger.exception';
import { WarningException } from '@/common/exceptions/warning.exception';

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

  async find_many_from_user(
    user_id: string,
    ctx: CtxType,
  ): Promise<SlotModel[]> {
    return (
      await this.prisma.guestShift.findMany({
        where: { guest_id: user_id },
        include: {
          shift_slot: true,
        },
      })
    ).map((guest_shift) => new SlotModel(guest_shift.shift_slot));
  }

  async assign_slot(
    guest_id: UserId,
    slot_id: number,
    ctx: CtxType,
  ): Promise<SlotModel> {
    try {
      await this.prisma.guestShift.upsert({
        where: {
          guest_id_shift_slot_id: {
            guest_id,
            shift_slot_id: slot_id,
          },
        },
        update: {},
        create: {
          guest_id: guest_id,
          shift_slot_id: slot_id,
        },
      });
      return this.find_slot(slot_id, ctx);
    } catch (error) {
      throw new DangerException(
        ctx.i18n.t('shift.exception.invalid_assignment'),
        error,
      );
    }
  }

  async unassign_slot(
    guest_id: UserId,
    slot_id: number,
    ctx: CtxType,
  ): Promise<SlotModel> {
    try {
      await this.prisma.guestShift.delete({
        where: {
          guest_id_shift_slot_id: {
            guest_id,
            shift_slot_id: slot_id,
          },
        },
      });
      return this.find_slot(slot_id, ctx);
    } catch (error) {
      throw new WarningException(
        ctx.i18n.t('shift.exception.guest_not_assigned'),
        error,
      );
    }
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

    if (!shift) {
      throw new DangerException(ctx.i18n.t('shift.exception.shift_not_found'));
    }

    return shift.shift_slots.map((slot) => new SlotModel(slot));
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

    if (!slot) {
      throw new DangerException(ctx.i18n.t('shift.exception.slot_not_found'));
    }

    return new SlotModel(slot);
  }
}
