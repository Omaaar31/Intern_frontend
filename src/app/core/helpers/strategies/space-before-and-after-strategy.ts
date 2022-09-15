import { ISanitizePunctuationStrategy } from './i-sanititize-punctuation-strategy';

export class SpaceBeforeAndAfterStrategy
  implements ISanitizePunctuationStrategy
{
  sanitize(): string {
    return 'Je dois ajouter un espace avant et après';
  }
}
