import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { PdfParseModule } from './pdf-parse/pdf-parse.module';
import { ScrapeModule } from './scrape/scrape.module';

@Module({
  imports: [ScrapeModule, OpenaiModule, PdfParseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
