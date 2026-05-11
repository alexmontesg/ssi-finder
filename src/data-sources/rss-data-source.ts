import { PollOptions } from '@/clients/rss/model/types.ts';
import { RSSPoller } from '@/clients/rss/poller.ts';
import Router from '@/routers/router.ts';
import DataSource from './data-source.ts';

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
