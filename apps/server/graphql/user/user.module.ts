import { Module } from '@nestjs/common';
import { UserResolver } from '@/graphql/user/user.resolver';
import { UserService } from '@/graphql/user/user.service';
import { AvatarServiceProvider } from '@/common/services/avatar/avatar.provider';
import { ShiftService } from '@/graphql/shift/shift.service';

@Module({
  providers: [UserResolver, UserService, AvatarServiceProvider, ShiftService],
})
export class UserModule {}
