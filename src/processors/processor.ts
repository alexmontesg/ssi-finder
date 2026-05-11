export interface Processor {
  process(document: Processable): Promise<void>;
}

export interface Processable {
  type: string;
}
