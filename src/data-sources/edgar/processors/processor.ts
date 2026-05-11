import { Processor } from '@/processors/processor.ts';
import Filing from '../model/filing.ts';

export interface FilingProcessor extends Processor {
  supports(formType: string): boolean;
  process(filing: Filing): Promise<void>;
}
