import { Processable, Processor } from '@/processors/processor.ts';

export default abstract class Router {
  processors: Array<Processor> = [];

  registerProcessor(processor: Processor) {
    this.processors.push(processor);
  }

  abstract route(processable: Processable): Promise<void>;
}
