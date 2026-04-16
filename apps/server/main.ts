import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../../.env'), quiet: true });

import { createApp } from '@/nest';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await createApp();
  app.enableCors();
  await app.listen(Number(process.env.PORT_BACKEND));
  Logger.verbose(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then();
