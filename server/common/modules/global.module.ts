import { Global, Module } from '@nestjs/common';
import { I18nGqlResolver } from '@/common/middleware/i18n.resolver';
import { EmailService } from '@/common/services/email.service';

@Global()
@Module({
  providers: [I18nGqlResolver, EmailService],
  exports: [I18nGqlResolver, EmailService],
})
export class GlobalModule {}
