export default class File {
  sequence?: string;
  file?: string;
  type?: string;
  size?: string;
  description?: string;
  url?: string;

  public constructor(init?: Partial<File>) {
    Object.assign(this, init);
  }
}
