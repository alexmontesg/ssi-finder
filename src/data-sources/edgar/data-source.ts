import { PollOptions } from '@/clients/rss/model/types.ts';
import RSSDataSource from '../rss-data-source.ts';
import Filing from './model/filing.ts';
import { EdgarRSSPoller } from './poller.ts';
import registerDefaultProcessors from './processors/registrar.ts';
import EdgarRouter from './router.ts';
import { EdgarRSSFetcher } from './fetcher.ts';

export default class EdgarDataSource extends RSSDataSource {
  name = 'EDGAR';
  override router: EdgarRouter;

  constructor(options: Partial<PollOptions> = {}) {
    const poller = new EdgarRSSPoller();
    const router = new EdgarRouter();

    const defaultOptions: PollOptions = {
      url: EdgarRSSFetcher.getFeedUrl(),
      intervalMs: 5 * 60 * 1000,
      onNewItems: (items) => EdgarDataSource.onNewItems(items, router),
      onError: (error: Error) => {
        console.error('Polling error:', error.message);
      },
    };
    super(poller, { ...defaultOptions, ...options });

    this.router = router;
    registerDefaultProcessors(this.router);
  }

  static async onNewItems(items: Array<unknown>, router: EdgarRouter) {
    const routingPromises = items
      .map((item) => item as { filing?: Filing })
      .filter((item) => item.filing)
      .map((item) => item.filing as Filing)
      .map((filing) => router.route(filing));

    await Promise.all(routingPromises);
  }
}
