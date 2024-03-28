import { Module } from '@nestjs/common';
import { UserService } from '@/graphql/user/user.service';
import { UserResolver } from '@/graphql/user/user.resolver';

@Module({
  providers: [UserService, UserResolver],
})
export class UserModule {}
