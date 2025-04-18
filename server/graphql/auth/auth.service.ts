import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { SignedInModel } from '@/types/models/signed_in.model';
import { CtxType } from '@/types/common/ctx.type';
import { EmailService } from '@/common/services/email.service';
import { WarningException } from '@/common/exceptions/warning.exception';
import { SignInInputModel } from '@/types/models/inputs/sign_in.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async sign_in(
    sign_in_input: SignInInputModel,
    ctx: CtxType,
  ): Promise<SignedInModel> {
    const user = await this.prisma.guest.findUnique({
      select: {
        id: true,
        email: true,
      },
      where: { email: sign_in_input.email },
    });

    if (user === null)
      throw new WarningException(ctx.i18n.t('auth.exception.forbidden_login'));

    const payload = {
      username: user.email,
      sub: { id: user.id },
    };
    return new SignedInModel(await this.jwtService.signAsync(payload));
  }

  async query_challenge(email: string, ctx: CtxType): Promise<boolean> {
    return false;
  }
}
