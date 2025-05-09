import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserPayloadType } from "@/types/common/user_payload.type";

export const UserID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | undefined => {
    const gql_ctx = GqlExecutionContext.create(ctx);
    const request: any = gql_ctx.getContext().req;
    const user: UserPayloadType = request.user;
    return user.sub?.id;
  },
);
