import { SSIChecker } from '@/core/ports/ssi-checker.ts';

export class MergerChecker implements SSIChecker {
  getType(): string {
    return 'Merger';
  }

  getHeuristicScore(): number {
    return 0;
  }

  getLLMScore(): number {
    // TODO: Implement
    return 0;
  }
}
