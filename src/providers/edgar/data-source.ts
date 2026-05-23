import { PollOptions } from '@/lib/rss/types.ts';
import RSSDataSource from '@/lib/rss/rss-data-source.ts';
import Filing from './domain/entities/filing.ts';
import { EdgarRSSPoller } from './infra/poller.ts';
import registerDefaultProcessors from './registrar.ts';
import EdgarRouter from './router.ts';
import { EdgarRSSFetcher } from './infra/fetcher.ts';
import { SSENotifier } from '@/lib/sse/sse-notifier.ts';
import EdgarProcessedFilling from '@/providers/edgar/domain/entities/processed-filing.ts';
import { Notifier } from '@/core/ports/notifier.ts';

export default class EdgarDataSource extends RSSDataSource {
  name = 'EDGAR';
  override router: EdgarRouter;
  override notifier: Notifier;

  constructor(options: Partial<PollOptions> = {}) {
    const poller = new EdgarRSSPoller();
    const router = new EdgarRouter();
    const notifier = new SSENotifier(); // TODO: Inject
    const notify = (p: EdgarProcessedFilling) => notifier.notify(p);

    const defaultOptions: PollOptions = {
      url: EdgarRSSFetcher.getFeedUrl(),
      intervalMs: 5 * 60 * 1000,
      onNewItems: (items) => EdgarDataSource.onNewItems(items, router, notify),
      onError: (error: Error) => {
        console.error('Polling error:', error.message);
      },
    };

    super(poller, { ...defaultOptions, ...options });

    this.router = router;
    this.notifier = notifier;

    registerDefaultProcessors(this.router);
  }

  static onNewItems(
    items: Array<unknown>,
    router: EdgarRouter,
    notify: (p: EdgarProcessedFilling) => Promise<void>,
  ) {
    const routingPromises = items
      .map((item) => item as { filing?: Filing })
      .filter((item) => item.filing)
      .map((item) => item.filing as Filing)
      .map((filing) => router.route(filing));

    routingPromises.forEach(async (promise) => {
      const results = await promise;
      setInterval(() => { // TODO: Repeat events just to facilitate testing when no new events are coming often (eg weekends)
        results.forEach(notify);
      }, 5000);
    });
  }
}
