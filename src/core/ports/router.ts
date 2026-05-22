import { Processable, Processed, Processor } from './processor.ts';

export default abstract class Router {
  processors: Array<Processor> = [];

  registerProcessor(processor: Processor) {
    this.processors.push(processor);
  }

  abstract route(processable: Processable): Promise<Processed[] | undefined>;
}
