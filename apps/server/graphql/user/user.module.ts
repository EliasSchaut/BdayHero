import { Module } from "@nestjs/common";
import { UserResolver } from "@/graphql/user/user.resolver";
import { UserService } from "@/graphql/user/user.service";

@Module({
  providers: [UserResolver, UserService],
})
export class UserModule {}
