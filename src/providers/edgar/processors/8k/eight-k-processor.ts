import Filing from '@/providers/edgar/domain/entities/filing.ts';
import EdgarProcessedFilling from '@/providers/edgar/domain/entities/processed-filing.ts';
import { FilingProcessor } from '@/providers/edgar/processors/processor.ts';

export default class EightKProcessor implements FilingProcessor {
  supports(formType: string): boolean {
    return formType === '8-K';
  }

  async process(filing: Filing): Promise<EdgarProcessedFilling> {
    let result = `Processing 8-K filing for ${filing.companyName}\n`;

    const eightKUrl = filing.files?.find((file) => file.type === '8-K')?.url;

    result += eightKUrl
      ? `8-K URL: ${eightKUrl}`
      : 'No 8-K file found in the filing.';

    return await Promise.resolve(new EdgarProcessedFilling(result));
  }
}
