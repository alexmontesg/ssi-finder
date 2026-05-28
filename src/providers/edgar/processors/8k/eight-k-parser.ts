import { HTMLParser } from '@/lib/html/parser.ts';
import { EightKSection } from '@/providers/edgar/processors/8k/eight-k-section.ts';
import { EdgarDocumentDownloader } from '@/providers/edgar/processors/document-downloader.ts';

export class EightKParser {
  private sections: Array<EightKSection> = [];

  private constructor(readonly parser: HTMLParser) {
    const paragraphs = parser.extractText();
    this.buildSections(paragraphs);
  }

  private buildSections(paragraphs: Array<string>) {
    let current: EightKSection | null = null;

    for (const text of paragraphs) {
      if (EightKSection.isSectionStart(text)) {
        if (current) this.sections.push(current);

        current = new EightKSection(text);

        continue;
      }

      if (current) {
        current.appendLine(text);
      }
    }

    if (current) this.sections.push(current);
  }

  getSections() {
    return this.sections;
  }

  static async build(eightKUrl?: string) {
    if (!eightKUrl) {
      throw new Error('No document found');
    }

    const content = await EdgarDocumentDownloader.getInstance().fetch(
      eightKUrl,
    );

    return new EightKParser(new HTMLParser(content));
  }
}
