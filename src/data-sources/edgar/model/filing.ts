import { Processable } from '../../../processors/processor.ts';
import EdgarFile from './edgar-file.ts';
import { EdgarRSSFiling } from './types.ts';

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
  files?: Array<EdgarFile>;

  public constructor(init?: Partial<Filing>) {
    Object.assign(this, init);
  }

  public static fromRSSFiling(filing: EdgarRSSFiling): Filing {
    return new Filing({
      companyName: filing['edgar:companyName'] as string,
      formType: filing['edgar:formType'] as string,
      filingDate: filing['edgar:filingDate'] as string,
      cikNumber: Number(filing['edgar:cikNumber']),
      accessionNumber: filing['edgar:accessionNumber'] as string,
      fileNumber: filing['edgar:fileNumber'] as string,
      acceptanceDatetime: Number(filing['edgar:acceptanceDatetime']),
      period: Number(filing['edgar:period']),
      fiscalYearEnd: Number(filing['edgar:fiscalYearEnd']),
      files: Filing.getFiles(filing),
    });
  }

  private static getFiles(source: EdgarRSSFiling): Array<EdgarFile> {
    const files = source['edgar:xbrlFiles']?.['edgar:xbrlFile'];
    if (!files || !Array.isArray(files)) {
      return [];
    }

    return files.map(EdgarFile.fromRSSFiling);
  }
}
