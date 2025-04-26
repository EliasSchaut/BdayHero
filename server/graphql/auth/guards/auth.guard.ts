import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenException } from '@/common/exceptions/forbidden.exception';
import { ValidationCtxType } from '@/types/common/val_ctx.type';
import { UserPayloadType } from '@/types/common/user_payload.type';
import { I18nGqlResolver } from '@/common/middleware/i18n.resolver';

@Injectable()
export abstract class AuthGuard implements CanActivate {
  constructor(
    protected readonly jwt_service: JwtService,
    protected readonly i18n: I18nGqlResolver,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = this.extract_request(ctx);

    const token = this.extract_token_from_header(req);
    if (!token) {
      throw new ForbiddenException(this.i18n.t('auth.exception.no_token', ctx));
    }

    let payload: UserPayloadType;
    try {
      payload = await this.jwt_service.verifyAsync(token);
    } catch (e) {
      throw new ForbiddenException(
        this.i18n.t('auth.exception.invalid_token', ctx),
        e,
      );
    }

    return await this.validate(payload, { ctx, req });
  }

  abstract validate(
    payload: UserPayloadType,
    { ctx, req }: ValidationCtxType,
  ): Promise<boolean>;

  private extract_request(ctx: ExecutionContext): Request {
    const gql_ctx = GqlExecutionContext.create(ctx);
    return gql_ctx.getContext().req;
  }

  private extract_token_from_header(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
