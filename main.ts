import EdgarDataSource from '@/providers/edgar/data-source.ts';

async function main() {
  const dataSource = new EdgarDataSource();

  await dataSource.startScan();
}

main();
