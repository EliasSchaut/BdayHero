import { Module } from '@nestjs/common';
import { UserService } from '@/graphql/user/user.service';
import { UserResolver } from '@/graphql/user/user.resolver';
import { NewsletterService } from '@/common/services/newsletter.service';

@Module({
  providers: [UserService, UserResolver, NewsletterService],
})
export class UserModule {}
