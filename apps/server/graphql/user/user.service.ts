import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CtxType } from "@/types/common/ctx.type";
import { GuestModel } from "@/types/models/guest.model";
import { GuestInputModel } from "@/types/models/inputs/guest.input";
import { AvatarService } from "@/common/services/avatar/avatar.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly avatarService: AvatarService,
  ) {}

  async find_many(): Promise<GuestModel[]> {
    return (await this.prisma.guest.findMany()).map((user) => {
      const guest = new GuestModel(user);
      return guest.profile_public ? guest : guest.clear_user_profile();
    });
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
    return new GuestModel(
      await this.prisma.guest.create({
        data: user_input_data,
      }),
    );
  }

  async update(
    user_update_data: GuestModel,
    ctx: CtxType = new CtxType(),
  ): Promise<GuestModel> {
    await this.update_user_fields(user_update_data);
    return new GuestModel(
      await this.prisma.guest.update({
        where: { id: ctx.user_id },
        data: user_update_data,
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

  async update_user_fields(user: GuestModel): Promise<void> {
    await this.update_avatar(user);
    this.update_initials(user);
  }

  private async update_avatar(user: GuestModel): Promise<void> {
    user.avatar_url =
      (await this.avatarService.get_avatar_href(user)) ?? undefined;
  }

  private update_initials(user: GuestModel): void {
    if (user.first_name && user.last_name) {
      user.initials =
        user.first_name.charAt(0).toUpperCase() +
        user.last_name.charAt(0).toUpperCase();
    } else {
      user.initials = user.email.charAt(0).toUpperCase();
    }
  }
}
