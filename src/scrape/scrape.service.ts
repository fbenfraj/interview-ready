import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ScrapeService {
  async scrapeJobDescription(url: string): Promise<string> {
    try {
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
      const page = await browser.newPage();

      await page.goto(url, {
        waitUntil: 'networkidle2',
      });

      const textContent = await page.evaluate(() => document.body.textContent);

      await browser.close();

      return textContent;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error scraping job description',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
