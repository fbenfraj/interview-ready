import { Module } from '@nestjs/common';
import { ScrapeService } from './scrape.service';

@Module({
  controllers: [],
  providers: [ScrapeService],
})
export class ScrapeModule {}
