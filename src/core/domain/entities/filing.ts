import { Processable } from '@/core/ports/processor.ts';
import File from './file.ts';

export default class Filing implements Processable {
  type = 'sec-filing';
  companyName?: string;
  formType?: string;
  filingDate?: string;
  cikNumber?: number;
  accessionNumber?: string;
  fileNumber?: string;
  acceptanceDatetime?: number;
  period?: number;
  fiscalYearEnd?: number;
  files?: Array<File>;

  public constructor(init?: Partial<Filing>) {
    Object.assign(this, init);
  }
}
