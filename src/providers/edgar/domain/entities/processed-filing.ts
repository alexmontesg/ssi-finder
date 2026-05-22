import { Processed } from '@/core/ports/processor.ts';

export default class EdgarProcessedFilling implements Processed {
  constructor(readonly result: string) {}

  getResult(): string {
    return this.result;
  }
}
