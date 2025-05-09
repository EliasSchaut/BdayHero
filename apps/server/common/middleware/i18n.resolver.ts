import { I18nContext, I18nResolver, I18nService } from "nestjs-i18n";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class I18nGqlResolver implements I18nResolver {
  constructor(private readonly i18n: I18nService) {}

  private readonly DEFAULT_LANG = process.env.DEFAULT_LANGUAGE as string;

  public resolve(
    ctx: ExecutionContext,
  ): Promise<string | string[] | undefined> | string | string[] | undefined {
    const gql_ctx = GqlExecutionContext.create(ctx);
    const req = gql_ctx.getContext().req;
    const curr_lang = req.headers["accept-language"];
    const is_curr_lang_supported = this.i18n
      .getSupportedLanguages()
      .includes(curr_lang);
    return is_curr_lang_supported ? curr_lang : this.DEFAULT_LANG;
  }

  public t(key: string, ctx?: ExecutionContext): string {
    const i18nContext = I18nContext.current();
    let lang: string;

    if (i18nContext) {
      lang = i18nContext.lang;
    } else if (ctx) {
      lang = this.resolve(ctx) as string;
    } else {
      lang = this.DEFAULT_LANG;
    }
    return this.i18n.t(key, { lang });
  }
}
