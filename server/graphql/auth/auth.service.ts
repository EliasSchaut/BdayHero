import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { SignedInModel } from '@/types/models/signed_in.model';
import { CtxType } from '@/types/common/ctx.type';
import { UserPayloadType } from '@/types/common/user_payload.type';
import { UserService } from '@/graphql/user/user.service';
import { GuestInputModel } from '@/types/models/inputs/guest.input';
import { WarningException } from '@/common/exceptions/warning.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async sign_in_local(
    token: string,
    ctx: CtxType = new CtxType(),
  ): Promise<SignedInModel> {
    let user_payload = await this.validate_user_token(token);
    const email = user_payload.username;

    if (!user_payload) {
      throw new WarningException('Invalid token');
    }

    let user = await this.userService.find_by_email(email, ctx);

    if (user === null) {
      user = await this.userService.create({ email } as GuestInputModel);
    }

    user_payload = {
      username: user.email,
      sub: { id: user.id },
    } as UserPayloadType;
    return await this.sign_user_payload(user_payload);
  }

  private async validate_user_token(token: string): Promise<UserPayloadType> {
    return (await this.jwtService.verifyAsync(token)) as UserPayloadType;
  }

  private async sign_user_payload(
    payload: UserPayloadType,
  ): Promise<SignedInModel> {
    return new SignedInModel(await this.jwtService.signAsync(payload));
  }
}
