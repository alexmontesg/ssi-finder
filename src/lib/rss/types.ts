export interface RSSItem {
  title: string;
  link: string;
  guid: string;
  description: string;
  pubDate: string;
}

export interface RSSFeed {
  title: string;
  items: RSSItem[];
}

export interface PollOptions {
  url: string;
  intervalMs: number;
  onNewItems: (items: RSSItem[]) => void | Promise<void>;
  onError: (error: Error) => void;
}
