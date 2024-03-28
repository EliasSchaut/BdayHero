import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { AuthModel } from '@/types/models/auth.model';
import { CtxType } from '@/types/ctx.type';
import { UserModel } from '@/types/models/user.model';
import { EmailService } from '@/common/services/email.service';
import { UserInputModel } from '@/types/models/inputs/user.input';
import { Prisma } from '@prisma/client';
import { WarningException } from '@/common/exceptions/warning.exception';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async sign_in(
    email: string,
    password: string,
    ctx: CtxType,
  ): Promise<AuthModel> {
    const user = await this.prisma.user.findUnique({
      select: { id: true, verified: true, is_admin: true },
      where: { email: email },
    });

    if (user === null)
      throw new WarningException(ctx.i18n.t('auth.exception.forbidden_login'));

    if (!user.verified)
      throw new WarningException(
        ctx.i18n.t('auth.exception.forbidden_not_verified'),
      );

    const payload = { username: user.id, sub: { is_admin: user.is_admin } };
    return {
      barrier_token: await this.jwtService.signAsync(payload),
      is_admin: user.is_admin,
    } as AuthModel;
  }

  async register(
    user_input_data: UserInputModel,
    ctx: CtxType,
  ): Promise<UserModel | null> {
    return this.prisma.user
      .create({
        data: {
          ...user_input_data,
        },
      })
      .then(async (user) => {
        if (user.email) {
          this.emailService.send_verify(
            user.email,
            user.first_name,
            this.emailService.generate_verify_url(
              user.challenge as string,
              process.env.URL_FRONTEND as string,
            ),
          );
        }
        return new UserModel(user).convert_to_public();
      })
      .catch((e: Prisma.PrismaClientKnownRequestError) => {
        if (e.code === 'P2002') {
          throw new WarningException(
            ctx.i18n.t('user.exception.conflict_username'),
          );
        } else {
          throw new WarningException(ctx.i18n.t('user.exception.create'));
        }
      });
  }

  async verify(challenge: string, ctx: CtxType): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({
      where: { challenge: challenge },
    });
    if (!user || user.verified) {
      throw new WarningException(ctx.i18n.t('auth.exception.not_found_verify'));
    }

    return new UserModel(
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          verified: true,
        },
      }),
    );
  }
}
