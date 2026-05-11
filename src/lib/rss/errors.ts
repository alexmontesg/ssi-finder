export class RSSFFetchError extends Error {
  constructor(message: string) {
    super(`RSSFetchError: ${message}`);
  }
}
