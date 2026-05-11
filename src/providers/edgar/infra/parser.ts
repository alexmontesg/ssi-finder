import { RSSParser } from '@/lib/rss/parser.ts';
import { EdgarRSSFile, EdgarRSSFiling } from '../model/rss-types.ts';
import Filing from '@/core/domain/entities/filing.ts';
import File from '@/core/domain/entities/file.ts';

export class EdgarRSSParser extends RSSParser {
  protected override parseItem(item: { [key: string]: unknown }) {
    const baseItem = super.parseItem(item);
    const edgarFiling = item['edgar:xbrlFiling'] as
      | EdgarRSSFiling
      | undefined;

    return {
      ...baseItem,
      filing: edgarFiling ? this.parseFiling(edgarFiling) : null,
    };
  }

  private parseFiling(filing: EdgarRSSFiling): Filing {
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
      files: this.getFiles(filing),
    });
  }

  private getFiles(source: EdgarRSSFiling): Array<File> {
    const files = source['edgar:xbrlFiles']?.['edgar:xbrlFile'];
    if (!files || !Array.isArray(files)) {
      return [];
    }

    return files.map(this.parseFile);
  }

  private parseFile(file: EdgarRSSFile): File {
    return new File({
      sequence: file['@_edgar:sequence'] as string,
      file: file['@_edgar:file'] as string,
      type: file['@_edgar:type'] as string,
      size: file['@_edgar:size'] as string,
      description: file['@_edgar:description'] as string,
      url: file['@_edgar:url'] as string,
    });
  }
}
