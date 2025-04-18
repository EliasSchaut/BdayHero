import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { EnvValidationSchema } from '@/common/validation/env.validation';
import { I18nLangResolver } from '@/common/middleware/i18n.resolver';
import { AuthModule } from '@/graphql/auth/auth.module';
import { UserModule } from '@/graphql/user/user.module';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'debug',
          }),
        ],
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: process.env.DEFAULT_LANGUAGE as string,
      loaderOptions: {
        path: join(__dirname, '/locales/'),
        watch: process.env.NODE_ENV !== 'production',
      },
      loader: I18nJsonLoader,
      resolvers: [I18nLangResolver],
      typesOutputPath: join(
        __dirname,
        'types',
        'generated',
        'i18n.generated.ts',
      ),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/',
      subscriptions: {
        'graphql-ws': true,
      },
      autoSchemaFile: join(__dirname, 'types', 'generated', 'schema.gql'),
    }),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION as string },
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
