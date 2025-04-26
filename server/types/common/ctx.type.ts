import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '@/types/generated/i18n.generated';
import { UserId } from '@/types/common/ids.type';

export class CtxType {
  i18n: I18nContext<I18nTranslations> = I18nContext.current()!;
  user_id?: UserId;
}
