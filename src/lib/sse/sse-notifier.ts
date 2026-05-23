import { Notifiable, Notifier } from '@/core/ports/notifier.ts';
import startServer from '@/lib/sse/server.ts';

export class SSENotifier implements Notifier {
  private readonly sendEvent;

  constructor() {
    this.sendEvent = startServer().sendEvent;
  }

  notify(report: Notifiable): Promise<void> {
    return Promise.resolve(this.sendEvent(report));
  }
}
