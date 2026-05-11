import { RSSFetcher } from '@/lib/rss/fetcher.ts';

export class EdgarRSSFetcher extends RSSFetcher {
  static getFeedUrl(): string {
    const feedUrl = Deno.env.get('EDGAR_RSS_FEED_URL');
    if (!feedUrl) {
      throw new Error('EDGAR_RSS_FEED_URL environment variable is not set.');
    }
    return feedUrl;
  }

  protected override getOptions(): RequestInit {
    const userAgent = Deno.env.get('EDGAR_USER_AGENT');
    const feedUrl = EdgarRSSFetcher.getFeedUrl();
    if (!userAgent) {
      throw new Error('EDGAR_USER_AGENT environment variable is not set.');
    }

    return {
      headers: {
        'User-Agent': userAgent,
        Accept: 'application/atom+xml, application/xml, text/xml',
        'Accept-Encoding': 'gzip, deflate',
        Connection: 'keep-alive',
        Host: new URL(feedUrl).host,
      },
    };
  }
}
