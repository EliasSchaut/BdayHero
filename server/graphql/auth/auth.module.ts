import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { EmailService } from '@/common/services/email.service';

@Module({
  providers: [AuthService, AuthResolver, EmailService],
})
export class AuthModule {}
