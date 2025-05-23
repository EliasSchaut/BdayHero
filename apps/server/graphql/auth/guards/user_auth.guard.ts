import { CanActivate, Injectable } from "@nestjs/common";
import { AuthGuard } from "@/graphql/auth/guards/auth.guard";
import { ValidationCtxType } from "@/types/common/val_ctx.type";
import { UserPayloadType } from "@/types/common/user_payload.type";

@Injectable()
export class UserAuthGuard extends AuthGuard implements CanActivate {
  async validate(
    payload: UserPayloadType,
    { req }: ValidationCtxType & { req: { user: UserPayloadType } },
  ): Promise<boolean> {
    if (!payload.username || !payload.sub?.id) return false;
    req["user"] = {
      username: payload.username,
      sub: { id: payload.sub?.id },
    } as UserPayloadType;
    return true;
  }
}
