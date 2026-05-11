import { RSSParser } from '@/clients/rss/parser.ts';
import { EdgarRSSFiling } from './model/types.ts';
import Filing from './model/filing.ts';

export class EdgarRSSParser extends RSSParser {
  protected override parseItem(item: { [key: string]: unknown }) {
    const baseItem = super.parseItem(item);
    const edgarFiling = item['edgar:xbrlFiling'] as EdgarRSSFiling | undefined;

    return {
      ...baseItem,
      filing: edgarFiling ? Filing.fromRSSFiling(edgarFiling) : null,
    };
  }
}
