import { Test, TestingModule } from '@nestjs/testing';
import { PdfParseService } from './pdf-parse.service';

describe('PdfParseService', () => {
  let service: PdfParseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfParseService],
    }).compile();

    service = module.get<PdfParseService>(PdfParseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('parsePdf', () => {
    it('should extract the text from a PDF file', async () => {
      // Read the file path of a test PDF file
      const filePath = `${process.cwd()}/test/pdf-parse/test.pdf`;
      // Call the parsePdf method and store the result in a variable
      const text = await service.parsePdf(filePath);
      // Assert that the text variable contains the expected text
      expect(text).toEqual(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida eleifend augue, vitae lacinia lacus auctor eget. In pellentesque lobortis dui ut euismod. Sed condimentum metus purus, in facilisis lorem dapibus id.',
      );
    });
  });
});
