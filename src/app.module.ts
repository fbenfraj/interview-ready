import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { ScrapeModule } from './scrape/scrape.module';

@Module({
  imports: [ScrapeModule, OpenaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
