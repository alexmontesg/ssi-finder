import { DOMParser, HTMLDocument } from 'jsr:@b-fuze/deno-dom@0.1.56';

export class HTMLParser {
  private document: HTMLDocument;

  constructor(readonly htmlContent: string) {
    const document = new DOMParser().parseFromString(htmlContent, 'text/html');
    if (!document) throw new Error('Failed to parse');

    this.document = document;
  }

  extractText() {
    return [...this.document.querySelectorAll('p, span')].map((p) =>
      p.textContent.trim()
    )
      .filter(
        Boolean,
      );
  }
}
