import { RSSFFetchError } from './errors.ts';

export class RSSFetcher {
  async fetchRSSFeed(url: string): Promise<string> {
    const response = await fetch(url, this.getOptions());

    if (!response.ok) {
      console.error(response);
      throw new RSSFFetchError(
        `Failed to fetch RSS feed from ${url}: ${response.statusText}`,
      );
    }

    return await response.text();
  }

  protected getOptions(): RequestInit {
    return {};
  }
}
