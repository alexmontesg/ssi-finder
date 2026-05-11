import { RSSItem } from '@/lib/rss/types.ts';

export interface EdgarRSSFile {
  '@_edgar:sequence'?: string;
  '@_edgar:file'?: string;
  '@_edgar:type'?: string;
  '@_edgar:size'?: string;
  '@_edgar:description'?: string;
  '@_edgar:inlineXBRL'?: string;
  '@_edgar:url'?: string;
}

export interface EdgarRSSFiling {
  'edgar:companyName'?: string;
  'edgar:formType'?: string;
  'edgar:filingDate'?: string;
  'edgar:cikNumber'?: number;
  'edgar:accessionNumber'?: string;
  'edgar:fileNumber'?: string;
  'edgar:acceptanceDatetime'?: number;
  'edgar:period'?: number;
  'edgar:assistantDirector'?: string;
  'edgar:assignedSic'?: number;
  'edgar:fiscalYearEnd'?: number;
  'edgar:xbrlFiles'?: {
    'edgar:xbrlFile'?: Array<EdgarRSSFile>;
  };
}

export interface EdgarRSSItem extends RSSItem {
  'edgar:xbrlFiling': EdgarRSSFiling;
}
