import { RSSFetcher } from './fetcher.ts';
import { RSSParser } from './parser.ts';
import { PollOptions } from './types.ts';

export class RSSPoller {
  private seenGuids = new Set<string>();
  private pollIntervalId?: number;
  private fetcher: RSSFetcher;
  private parser: RSSParser;

  constructor(
    { fetcher, parser }: { fetcher?: RSSFetcher; parser?: RSSParser } = {},
  ) {
    this.fetcher = fetcher ?? new RSSFetcher();
    this.parser = parser ?? new RSSParser();
  }

  async start(options: PollOptions): Promise<void> {
    console.log(`Starting RSS poller with interval: ${options.intervalMs}ms`);

    await this.fetchAndProcess(options);

    this.pollIntervalId = setInterval(
      () => this.fetchAndProcess(options),
      options.intervalMs,
    ) as unknown as number;
  }

  stop(): void {
    if (this.pollIntervalId !== undefined) {
      clearInterval(this.pollIntervalId);
      this.pollIntervalId = undefined;
      console.log('RSS poller stopped');
    }
  }

  private async fetchAndProcess(options: PollOptions): Promise<void> {
    try {
      const xmlData = await this.fetcher.fetchRSSFeed(options.url);
      const feed = this.parser.parse(xmlData);

      const newItems = feed.items.filter((item) => {
        const itemId = item.link || item.title;
        if (this.seenGuids.has(itemId)) {
          return false;
        }
        this.seenGuids.add(itemId);
        return true;
      });

      if (newItems.length > 0) {
        console.log(`Found ${newItems.length} new items`);
        await options.onNewItems(newItems);
      }
    } catch (error) {
      options.onError(error as Error);
    }
  }
}
