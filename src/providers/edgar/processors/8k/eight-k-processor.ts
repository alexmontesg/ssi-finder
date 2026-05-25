import Filing from '@/providers/edgar/domain/entities/filing.ts';
import EdgarProcessedFilling from '@/providers/edgar/domain/entities/processed-filing.ts';
import { FilingProcessor } from '@/providers/edgar/processors/processor.ts';

export default class EightKProcessor implements FilingProcessor {
  supports(formType: string): boolean {
    return formType === '8-K';
  }

  async process(filing: Filing): Promise<EdgarProcessedFilling> {
    const result = {
      id: filing.accessionNumber,
      company: filing.companyName,
      filing: filing.formType,
    } as {
      id: string;
      company: string;
      filing: string;
      document: string | undefined;
    };

    filing.companyName;

    const eightKUrl = filing.files?.find((file) => file.type === '8-K')?.url;

    result.document = eightKUrl;

    return await Promise.resolve(new EdgarProcessedFilling(result));
  }
}
