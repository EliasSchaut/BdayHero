import { Provider } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LocalAuthStrategy } from '@/graphql/auth/strategies/local.strategy';

export const AuthStrategyProvider: Provider = {
  provide: PassportStrategy,
  useClass: (() => {
    return LocalAuthStrategy;
  })(),
};
