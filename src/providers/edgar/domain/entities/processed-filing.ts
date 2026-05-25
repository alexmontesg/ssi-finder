import { Processed } from '@/core/ports/processor.ts';
import { Notifiable } from '@/core/ports/notifier.ts';

export default class EdgarProcessedFilling implements Processed, Notifiable {
  constructor(readonly result: unknown) {}

  getResult(): string {
    return JSON.stringify(this.result);
  }

  asText(): string {
    return this.getResult();
  }
}
