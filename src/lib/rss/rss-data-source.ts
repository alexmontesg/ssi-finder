import { PollOptions } from './types.ts';
import { RSSPoller } from './poller.ts';
import Router from '@/core/ports/router.ts';
import DataSource from '@/core/ports/data-source.ts';
import { Notifier } from '@/core/ports/notifier.ts';

export default abstract class RSSDataSource implements DataSource {
  protected poller: RSSPoller;
  protected options: PollOptions;

  abstract name: string;
  abstract router: Router;
  abstract notifier: Notifier;

  constructor(poller: RSSPoller, options: PollOptions) {
    this.poller = poller;
    this.options = options;
  }

  async startScan() {
    return await this.poller.start(this.options);
  }
}
