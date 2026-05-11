import Router from '../routers/router.ts';

export default interface DataSource {
  name: string;
  router: Router;

  startScan(): Promise<void>;
}
