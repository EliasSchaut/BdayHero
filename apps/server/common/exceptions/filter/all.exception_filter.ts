import { ArgumentsHost, Catch } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { I18nContext } from "nestjs-i18n";
import { DangerException } from "@/common/exceptions/danger.exception";
import { Exception } from "@/common/exceptions/exception";
import { I18nTranslations } from "@/types/generated/i18n.generated";

@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): DangerException {
    if (exception instanceof Exception) return exception;

    const i18n = I18nContext.current<I18nTranslations>(host);
    if (i18n)
      return new DangerException(
        i18n.t("common.exception.internal"),
        exception,
      );
    else
      return new DangerException(
        "An error has occurred! Try again later.",
        exception,
      );
  }
}
