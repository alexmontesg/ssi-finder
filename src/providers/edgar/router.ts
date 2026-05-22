import { FilingProcessor } from './processors/processor.ts';
import Filing from './domain/entities/filing.ts';
import Router from '@/core/ports/router.ts';

export default class EdgarRouter extends Router {
  override processors: FilingProcessor[] = [];

  async route(filing: Filing) {
    if (!filing.formType) {
      return;
    }
    const { formType } = filing;

    const matchingProcessors = this.processors.filter((p) =>
      p.supports(formType)
    );

    return await Promise.all(matchingProcessors.map((p) => p.process(filing)));
  }
}
