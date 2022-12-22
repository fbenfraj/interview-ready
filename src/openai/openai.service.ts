import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { TextContext } from '../types/text';
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
      max_tokens: 256,
      temperature: 0.5,
    });

    return response.data.choices[0].text;
  }

  async summarize(text: string, context?: TextContext): Promise<string> {
    // Set the prompt based on the text type
    let contextSentence = '';

    switch (context) {
      case TextContext.RESUME:
        contextSentence =
          'The text is the content of a resume extracted from a pdf.';
        break;

      case TextContext.JOB_DESCRIPTION:
        contextSentence =
          'The text is the content of a job description extracted from a website.';
        break;

      default:
        contextSentence = '';
    }

    const prompt = `${contextSentence} Write a summary of the following text but do not lose any information from the original text. The text is: ${text}.\n `;

    return this.prompt('text-davinci-002', prompt);
  }
}
