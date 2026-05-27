const EIGHT_K_ITEM_REGEX = /^Item\s+(\d+\.\d+)\.?\s*(.*)$/i;

export class EightKSection {
  private readonly item: string;
  private readonly title: string;
  private readonly body: Array<string> = [];

  constructor(text: string) {
    if (!EightKSection.isSectionStart(text)) {
      throw new Error('Text is not a section start');
    }

    const match = text.match(EIGHT_K_ITEM_REGEX);
    this.item = match?.[1]!;
    this.title = match?.[2]!;
    this.body = [];
  }

  appendLine(text: string) {
    this.body.push(text);
  }

  static isSectionStart(text: string) {
    return text.match(EIGHT_K_ITEM_REGEX);
  }
}
