import { Injectable } from "@nestjs/common";
import { Avatar } from "@/common/services/avatar/avatar.interface";
import { GuestModel } from "@/types/models/guest.model";

@Injectable()
export abstract class AvatarService implements Avatar {
  public abstract get_avatar_href(user: GuestModel): Promise<string | null>;

  public abstract upload_avatar(
    file: any,
    user: GuestModel,
  ): Promise<string | null>;

  public abstract delete_avatar(user: GuestModel): Promise<string | null>;
}
