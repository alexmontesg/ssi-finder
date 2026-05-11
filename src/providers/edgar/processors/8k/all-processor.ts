import Filing from '../../domain/entities/filing.ts';
import { FilingProcessor } from '../processor.ts';

export default class AllProcessor implements FilingProcessor {
  supports(_formType: string): boolean {
    return true;
  }

  async process(filing: Filing): Promise<void> {
    console.log(
      `Processing filing for ${filing.companyName} (${filing.formType})`,
    );

    return await Promise.resolve();
  }
}
