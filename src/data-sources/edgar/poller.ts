import { RSSPoller } from '@/clients/rss/poller.ts';
import { EdgarRSSFetcher } from './fetcher.ts';
import { EdgarRSSParser } from './parser.ts';

export class EdgarRSSPoller extends RSSPoller {
  constructor() {
    super({
      fetcher: new EdgarRSSFetcher(),
      parser: new EdgarRSSParser(),
    });
  }
}
