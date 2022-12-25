import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class OpenaiService {
  private openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      }),
    );
  }

  async prompt(model: string, prompt: string): Promise<string> {
    const response = await this.openai.createCompletion({
      model,
      prompt,
      temperature: 0.5,
    });

    return response.data.choices[0].text;
  }
}
