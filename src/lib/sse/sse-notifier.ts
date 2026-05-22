import { Notifier } from '@/core/ports/notifier.ts';
import { Processed } from '@/core/ports/processor.ts';
import startServer from '@/lib/sse/server.ts';

export class SSENotifier implements Notifier {
  private readonly sendEvent;

  constructor() {
    this.sendEvent = startServer().sendEvent;
  }

  notify(report: Processed): Promise<void> {
    return Promise.resolve(this.sendEvent(report));
  }
}
