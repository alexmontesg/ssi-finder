export interface SSIChecker {
  getType(): string;
  getHeuristicScore(): number;
  getLLMScore(): number;
}
