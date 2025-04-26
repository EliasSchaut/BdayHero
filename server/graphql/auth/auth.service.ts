import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { SignedInModel } from '@/types/models/signed_in.model';
import { CtxType } from '@/types/common/ctx.type';
import { UserPayloadType } from '@/types/common/user_payload.type';
import { UserService } from '@/graphql/user/user.service';
import { GuestInputModel } from '@/types/models/inputs/guest.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async sign_in_local(
    email: string,
    ctx: CtxType = new CtxType(),
  ): Promise<SignedInModel> {
    let user = await this.prisma.guest.findUnique({
      select: {
        id: true,
        email: true,
      },
      where: { email: email },
    });

    if (user === null) {
      user = await this.userService.create({ email } as GuestInputModel);
    }

    const payload = {
      username: user.email,
      sub: { id: user.id },
    } as UserPayloadType;
    return new SignedInModel(await this.jwtService.signAsync(payload));
  }
}
