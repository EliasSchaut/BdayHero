import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { CtxType } from "@/types/common/ctx.type";
import { GuestModel } from "@/types/models/guest.model";
import { GuestUpdateInputModel } from "@/types/models/inputs/guest_update.input";
import { GuestInputModel } from "@/types/models/inputs/guest.input";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
    user_update_input_data: GuestUpdateInputModel,
    ctx: CtxType = new CtxType(),
  ): Promise<GuestModel> {
    return new GuestModel(
      await this.prisma.guest.update({
        where: { id: ctx.user_id },
        data: user_update_input_data,
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
}
