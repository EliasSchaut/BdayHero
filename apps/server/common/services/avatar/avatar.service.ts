import { Injectable } from "@nestjs/common";
import { Avatar } from "@/common/services/avatar/avatar.interface";

@Injectable()
export abstract class AvatarService implements Avatar {
  public abstract get_avatar_href(email: string): Promise<string | null>;

  public abstract upload_avatar(
    file: any,
    email: string,
  ): Promise<string | null>;

  public abstract delete_avatar(email: string): Promise<string | null>;
}
