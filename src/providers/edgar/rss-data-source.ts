import { PollOptions } from '@/lib/rss/types.ts';
import { RSSPoller } from '@/lib/rss/poller.ts';
import Router from '@/core/ports/router.ts';
import DataSource from '@/core/ports/data-source.ts';

export default abstract class RSSDataSource implements DataSource {
  protected poller: RSSPoller;
  protected options: PollOptions;

  abstract name: string;
  abstract router: Router;

  constructor(poller: RSSPoller, options: PollOptions) {
    this.poller = poller;
    this.options = options;
  }

  async startScan() {
    return await this.poller.start(this.options);
  }
}
