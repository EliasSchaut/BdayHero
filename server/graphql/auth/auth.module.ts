import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from '@/graphql/user/user.service';
import { LocalAuthStrategy } from '@/graphql/auth/strategies/local.strategy';
import { LocalAuthGuard } from '@/graphql/auth/guards/local_auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    LocalAuthStrategy,
    LocalAuthGuard,
  ],
})
export class AuthModule {}
