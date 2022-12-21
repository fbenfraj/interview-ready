import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class PdfParseService {
  async parsePdf(filePath: string): Promise<string> {
    // Read the PDF file into a Buffer
    const buffer = fs.readFileSync(filePath);
    // Convert the Buffer to a Uint8Array
    const uint8Array = new Uint8Array(buffer);

    // Extract the text from the PDF using pdf-parse
    const data = await pdfParse(uint8Array);
    // Format the text to remove line breaks and trim whitespace
    const formatted = data.text.replace(/(\r\n|\n|\r)/gm, ' ').trim();
    // Return the formatted text
    return formatted;
  }
}
