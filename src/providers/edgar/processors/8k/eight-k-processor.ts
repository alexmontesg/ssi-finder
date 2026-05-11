import Filing from '@/core/domain/entities/filing.ts';
import { FilingProcessor } from '../processor.ts';

export default class EightKProcessor implements FilingProcessor {
  supports(formType: string): boolean {
    return formType === '8-K';
  }

  async process(filing: Filing): Promise<void> {
    console.log(`Processing 8-K filing for ${filing.companyName}`);
    const eightKUrl = filing.files?.find((file) => file.type === '8-K')?.url;
    if (eightKUrl) {
      console.log(`8-K URL: ${eightKUrl}`);
    } else {
      console.log('No 8-K file found in the filing.');
    }

    return await Promise.resolve();
  }
}
