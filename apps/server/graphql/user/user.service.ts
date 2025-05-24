import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CtxType } from '@/types/common/ctx.type';
import { GuestModel } from '@/types/models/guest.model';
import { GuestInputModel } from '@/types/models/inputs/guest.input';
import { AvatarService } from '@/common/services/avatar/avatar.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly avatarService: AvatarService,
  ) {}

  async find_many(): Promise<GuestModel[]> {
    return (
      await this.prisma.guest.findMany({
        include: { companion: true },
        orderBy: [
          {
            first_name: 'asc',
          },
          { last_name: 'asc' },
        ],
      })
    ).map((user) => new GuestModel(user));
  }

  async count(): Promise<number> {
    const users = await this.prisma.guest.count();
    const companions = await this.prisma.companion.count();
    return users + companions;
  }

  async find_by_id(ctx: CtxType): Promise<GuestModel | null> {
    const user = await this.prisma.guest.findUnique({
      where: { id: ctx.user_id },
      include: { companion: true },
    });
    return user ? new GuestModel(user) : null;
  }

  async find_by_email(
    email: string,
    ctx: CtxType = new CtxType(),
  ): Promise<GuestModel | null> {
    const user = await this.prisma.guest.findUnique({
      where: { email },
    });
    return user ? new GuestModel(user) : null;
  }

  async create(user_input_data: GuestInputModel) {
    const initials = this.generate_initials(user_input_data);
    const avatar_url = await this.avatarService.get_avatar_href(
      user_input_data.email,
    );
    return new GuestModel(
      await this.prisma.guest.create({
        data: { ...user_input_data, initials, avatar_url },
      }),
    );
  }

  async update(
    user_update_data: GuestModel,
    ctx: CtxType = new CtxType(),
  ): Promise<GuestModel> {
    await this.update_user_fields(user_update_data);
    const companions = user_update_data.companions;
    delete user_update_data.companions;
    return new GuestModel(
      await this.prisma.guest.update({
        where: { id: ctx.user_id },
        include: { companion: true },
        data: {
          ...user_update_data,
          companion: companions
            ? {
                deleteMany: {},
                create: companions,
              }
            : undefined,
        },
      }),
    );
  }

  async delete(ctx: CtxType = new CtxType()): Promise<GuestModel | null> {
    return new GuestModel(
      await this.prisma.guest.delete({
        where: { id: ctx.user_id },
      }),
    );
  }

  async update_user_fields(user: {
    last_name?: string;
    first_name?: string;
    email: string;
    avatar_url?: string;
    initials?: string;
  }): Promise<void> {
    user.avatar_url =
      (await this.avatarService.get_avatar_href(user.email)) ?? undefined;
    user.initials = this.generate_initials(user);
  }

  private generate_initials(user: {
    last_name?: string;
    first_name?: string;
    email: string;
  }): string {
    if (user.first_name && user.last_name) {
      return (
        user.first_name.charAt(0).toUpperCase() +
        user.last_name.charAt(0).toUpperCase()
      );
    } else {
      return user.email.charAt(0).toUpperCase();
    }
  }
}
