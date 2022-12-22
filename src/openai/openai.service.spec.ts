import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';
import { PdfParseService } from '../pdf-parse/pdf-parse.service';
import { TextContext } from '../types/text';
import { ScrapeService } from '../scrape/scrape.service';
import * as dotenv from 'dotenv';

dotenv.config();

describe('OpenaiService', () => {
  let openAiService: OpenaiService;
  let pdfParseService: PdfParseService;
  let scrapeService: ScrapeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiService, PdfParseService, ScrapeService],
    }).compile();

    openAiService = module.get<OpenaiService>(OpenaiService);
    pdfParseService = module.get<PdfParseService>(PdfParseService);
    scrapeService = module.get<ScrapeService>(ScrapeService);
  });

  it('should be defined', () => {
    expect(openAiService).toBeDefined();
  });

  describe('prompt', () => {
    it('should return a response from the OpenAI API', async () => {
      const model = 'text-davinci-002';
      const prompt = '40 + 2?';
      const response = await openAiService.prompt(model, prompt);

      expect(response).toBeDefined();
      expect(typeof response).toBe('string');
    });
  });

  describe('summarize', () => {
    it('should generate a summary of a resume', async () => {
      const text = await pdfParseService.parsePdf(
        `${process.cwd()}/test/pdf-parse/fake-resume.pdf`,
      );
      const context = TextContext.RESUME;
      const summary = await openAiService.summarize(text, context);

      expect(typeof summary).toBe('string');
    }, 20000);

    it.only('should generate a summary of a job description', async () => {
      const text = await scrapeService.scrapeJobDescription(
        process.env.JOB_DESCRIPTION_URL,
      );
      const context = TextContext.JOB_DESCRIPTION;
      const summary = await openAiService.summarize(text, context);

      expect(typeof summary).toBe('string');
    }, 20000);

    it('should generate a summary without context', async () => {
      const text = await pdfParseService.parsePdf(
        `${process.cwd()}/test/pdf-parse/fake-resume.pdf`,
      );
      const summary = await openAiService.summarize(text);

      expect(typeof summary).toBe('string');
    }, 20000);
  });
});
