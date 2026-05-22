export interface Processor {
  process(document: Processable): Promise<Processed>;
}

export interface Processable {
  type: string;
}

export interface Processed {
  getResult(): string; // TODO: TBD
}
