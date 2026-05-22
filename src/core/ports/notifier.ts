import { Processed } from '@/core/ports/processor.ts';

export interface Notifier {
  notify(report: Processed): Promise<void>;
}
