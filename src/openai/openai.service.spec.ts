import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';

describe('OpenaiService', () => {
  let service: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiService],
    }).compile();

    service = module.get<OpenaiService>(OpenaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('prompt', () => {
    it('should return a response from the OpenAI API', async () => {
      const model = 'text-davinci-002';
      const prompt = '40 + 2?';
      const response = await service.prompt(model, prompt);

      expect(response).toBeDefined();
      expect(typeof response).toBe('string');
    });
  });
});
