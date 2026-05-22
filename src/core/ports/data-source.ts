import { Notifier } from '@/core/ports/notifier.ts';
import Router from './router.ts';

export default interface DataSource {
  name: string;
  router: Router;
  notifier: Notifier;

  startScan(): Promise<void>;
}
