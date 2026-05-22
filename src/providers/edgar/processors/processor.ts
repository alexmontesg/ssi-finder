import { Processor } from '@/core/ports/processor.ts';
import Filing from '../domain/entities/filing.ts';
import EdgarProcessedFilling from '@/providers/edgar/domain/entities/processed-filing.ts';

export interface FilingProcessor extends Processor {
  supports(formType: string): boolean;
  process(filing: Filing): Promise<EdgarProcessedFilling>;
}
