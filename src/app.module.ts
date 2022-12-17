import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfParseModule } from './pdf-parse/pdf-parse.module';

@Module({
  imports: [PdfParseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
