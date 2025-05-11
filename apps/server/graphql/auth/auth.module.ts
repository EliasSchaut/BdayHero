import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { UserService } from "@/graphql/user/user.service";
import { LocalAuthStrategy } from "@/graphql/auth/strategies/local.strategy";
import { AvatarServiceProvider } from "@/common/services/avatar/avatar.provider";

@Module({
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    LocalAuthStrategy,
    AvatarServiceProvider,
  ],
})
export class AuthModule {}
