import Filing from '@/providers/edgar/domain/entities/filing.ts';
import EdgarProcessedFilling from '@/providers/edgar/domain/entities/processed-filing.ts';
import { FilingProcessor } from '@/providers/edgar/processors/processor.ts';

export default class AllProcessor implements FilingProcessor {
  supports(_formType: string): boolean {
    return true;
  }

  async process(filing: Filing): Promise<EdgarProcessedFilling> {
    const result = `Processing filing for ${filing.companyName} (${filing.formType})`;

    return await Promise.resolve(new EdgarProcessedFilling(result));
  }
}
