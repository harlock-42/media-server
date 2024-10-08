import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const mediaPath = process.env.MEDIA_PATH || '/app/media';
  const videoDir = join(mediaPath, 'videos');

  if (!existsSync(videoDir)) {
    mkdirSync(videoDir, { recursive: true });
    console.log(`Repository ${videoDir} created`);
  }
  await app.listen(3000);
}
bootstrap();
