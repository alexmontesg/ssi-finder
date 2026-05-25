import EdgarRouter from './router.ts';
import EightKProcessor from './processors/8k/eight-k-processor.ts';

export default function registerDefaultProcessors(router: EdgarRouter) {
  router.registerProcessor(new EightKProcessor());
}
