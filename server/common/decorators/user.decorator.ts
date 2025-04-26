import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserPayloadType } from '@/types/common/user_payload.type';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayloadType => {
    const gql_ctx = GqlExecutionContext.create(ctx);
    const request: any = gql_ctx.getContext().req;
    return request.user;
  },
);
