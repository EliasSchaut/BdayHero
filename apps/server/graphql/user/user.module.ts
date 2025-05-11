import { Module } from "@nestjs/common";
import { UserResolver } from "@/graphql/user/user.resolver";
import { UserService } from "@/graphql/user/user.service";
import { AvatarServiceProvider } from "@/common/services/avatar/avatar.provider";

@Module({
  providers: [UserResolver, UserService, AvatarServiceProvider],
})
export class UserModule {}
