import Filing from '@/providers/edgar/domain/entities/filing.ts';
import EdgarProcessedFilling from '@/providers/edgar/domain/entities/processed-filing.ts';
import { FilingProcessor } from '@/providers/edgar/processors/processor.ts';
import { EightKParser } from '@/providers/edgar/processors/8k/eight-k-parser.ts';

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

    if (eightKUrl) {
      const parser = await EightKParser.build(eightKUrl);
      const sections = parser.getSections();
      // TODO Feed section to individual SSI Checkers
    }

    result.document = eightKUrl;

    return new EdgarProcessedFilling(result);
  }
}
