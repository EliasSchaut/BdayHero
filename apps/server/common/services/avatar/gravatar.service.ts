import { Injectable } from "@nestjs/common";
import { AvatarService } from "@/common/services/avatar/avatar.service";
import { Avatar } from "@/common/services/avatar/avatar.interface";
import { DangerException } from "@/common/exceptions/danger.exception";
import { CryptoService } from "@/common/services/crypto.service";
import { GuestModel } from "@/types/models/guest.model";

@Injectable()
export class GravatarService extends AvatarService implements Avatar {
  private readonly GRAVATAR_BASE = "https://www.gravatar.com/avatar/";

  public async get_avatar_href(user: GuestModel): Promise<string | null> {
    const user_hash = await this.hash_email(user.email);
    return this.get_gravatar_url(user_hash);
  }

  public upload_avatar(): Promise<string> {
    return Promise.reject(
      new DangerException("Upload avatar is not supported for Gravatar"),
    );
  }

  public delete_avatar(): Promise<string> {
    return Promise.reject(
      new DangerException("Delete avatar is not supported for Gravatar"),
    );
  }

  private async hash_email(email: string): Promise<string> {
    return CryptoService.hash_md5(email);
  }

  private get_gravatar_url(hash: string): string {
    return `${this.GRAVATAR_BASE}${hash}`;
  }
}
