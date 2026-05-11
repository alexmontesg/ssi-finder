import { Processor } from '@/core/ports/processor.ts';
import Filing from '@/core/domain/entities/filing.ts';

export interface FilingProcessor extends Processor {
  supports(formType: string): boolean;
  process(filing: Filing): Promise<void>;
}
