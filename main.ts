import EdgarDataSource from '@/data-sources/edgar/data-source.ts';

async function main() {
  const dataSource = new EdgarDataSource();

  await dataSource.startScan();
}

main();
