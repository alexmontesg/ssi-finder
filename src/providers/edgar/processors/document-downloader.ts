export class EdgarDocumentDownloader {
  private static instance: EdgarDocumentDownloader | null = null;
  private static readonly THROTTLING_INTERVAL = 200;

  private queue: Promise<void> = Promise.resolve();

  private constructor() {}

  static getInstance() {
    if (!EdgarDocumentDownloader.instance) {
      EdgarDocumentDownloader.instance = new EdgarDocumentDownloader();
    }

    return EdgarDocumentDownloader.instance;
  }

  async fetch(documentUrl: string) {
    this.queue = this.queue.catch(() => {}).then(async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, EdgarDocumentDownloader.THROTTLING_INTERVAL)
      );
    });

    await this.queue;

    const response = await fetch(documentUrl, {
      headers: {
        'User-Agent': Deno.env.get('EDGAR_USER_AGENT')!,
      },
    });

    if (!response.ok) {
      throw new Error(
        `EDGAR request failed: ${response.status} ${response.statusText}`,
      );
    }

    return await response.text();
  }
}
