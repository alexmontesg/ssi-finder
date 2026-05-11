import { EdgarRSSFile } from './types.ts';

export default class EdgarFile {
  sequence?: string;
  file?: string;
  type?: string;
  size?: string;
  description?: string;
  url?: string;

  public constructor(init?: Partial<EdgarFile>) {
    Object.assign(this, init);
  }

  public static fromRSSFiling(file: EdgarRSSFile): EdgarFile {
    return new EdgarFile({
      sequence: file['@_edgar:sequence'] as string,
      file: file['@_edgar:file'] as string,
      type: file['@_edgar:type'] as string,
      size: file['@_edgar:size'] as string,
      description: file['@_edgar:description'] as string,
      url: file['@_edgar:url'] as string,
    });
  }
}
