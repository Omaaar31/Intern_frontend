export interface ISanitizePunctuationStrategy {
  sanitize(index: number, stringAsArray: string[], output: string): string;
}
