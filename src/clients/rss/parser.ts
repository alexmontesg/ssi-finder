import { XMLParser } from 'fast-xml-parser';
import { RSSFeed, RSSItem } from './model/types.ts';

export class RSSParser {
  private parser = new XMLParser({
    ignoreAttributes: false,
  });

  public parse(xmlData: string): RSSFeed {
    const parsedXml = this.parser.parse(xmlData);
    const channel = parsedXml?.rss?.channel;

    if (!channel) {
      throw new Error('Invalid RSS feed format');
    }

    const items: Array<{ [key: string]: unknown }> = Array.isArray(channel.item)
      ? channel.item
      : [channel.item];

    return {
      title: channel.title || 'No Title',
      items: items.map((item) => this.parseItem(item)),
    };
  }

  protected parseItem(item: { [key: string]: unknown }): RSSItem {
    return {
      title: (item['title'] as string) || 'No Title',
      link: (item['link'] as string) || '',
      guid: (item['guid'] as string) || '',
      description: (item['description'] as string) || '',
      pubDate: (item['pubDate'] as string) || '',
    };
  }
}
