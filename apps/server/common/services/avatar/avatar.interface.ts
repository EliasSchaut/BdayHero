import { GuestModel } from "@/types/models/guest.model";

export interface Avatar {
  get_avatar_href(user: GuestModel): Promise<string | null>;

  upload_avatar(file: any, user: GuestModel): Promise<string | null>;

  delete_avatar(user: GuestModel): Promise<string | null>;
}
