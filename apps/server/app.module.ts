import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { EnvValidationSchema } from '@/common/validation/env.validation';
import { I18nGqlResolver } from '@/common/middleware/i18n.resolver';
import { GlobalModule } from '@/common/modules/global.module';
import { AuthModule } from '@/graphql/auth/auth.module';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { UserModule } from '@/graphql/user/user.module';
import { ShiftModule } from '@/graphql/shift/shift.module';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/',
      subscriptions: {
        'graphql-ws': true,
      },
      context: (ctx: any) => ctx,
      autoSchemaFile: join(__dirname, 'types', 'generated', 'schema.gql'),
    }),
    I18nModule.forRoot({
      fallbackLanguage: process.env.DEFAULT_LANGUAGE as string,
      loaderOptions: {
        path: join(__dirname, '/locales/'),
        watch: process.env.NODE_ENV !== 'production',
      },
      loader: I18nJsonLoader,
      resolvers: [I18nGqlResolver],
      typesOutputPath: join(
        __dirname,
        'types',
        'generated',
        'i18n.generated.ts',
      ),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION as string },
    }),
    GlobalModule,
    AuthModule,
    UserModule,
    ShiftModule,
  ],
})
export class AppModule {}
