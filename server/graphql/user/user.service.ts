import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CtxType } from '@/types/common/ctx.type';
import { GuestModel } from '@/types/models/guest.model';
import { GuestUpdateInputModel } from '@/types/models/inputs/guest_update.input';
import { WarningException } from '@/common/exceptions/warning.exception';
import { EmailService } from '@/common/services/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async find_by_id(ctx: CtxType): Promise<GuestModel> {
    const user = await this.prisma.guest.findUnique({
      where: { id: ctx.user_id },
    });
    if (user === null) {
      throw new WarningException(ctx.i18n.t('user.exception.not_found'));
    }
    return new GuestModel(user);
  }

  async update(
    user_update_input_data: GuestUpdateInputModel,
    ctx: CtxType,
  ): Promise<GuestModel | null> {
    return new GuestModel(
      await this.prisma.guest.update({
        where: { id: ctx.user_id },
        data: user_update_input_data,
      }),
    );
  }

  async delete(ctx: CtxType): Promise<GuestModel | null> {
    return new GuestModel(
      await this.prisma.guest.delete({
        where: { id: ctx.user_id },
      }),
    );
  }
}
