import { Logger } from './logger.spec';
import { ISanitizePunctuationStrategy } from './strategies/i-sanititize-punctuation-strategy';
import { SpaceAfterOnlyStrategy } from './strategies/space-after-only-strategy';
import { SpaceBeforeAndAfterStrategy } from './strategies/space-before-and-after-strategy';
export class StringHelper {
  public static removeSpaces(input: string): string {
    return input.trim();
  }

  /**
   * Sanitize string ponctuation according language
   * @param input String to sanitize
   * @param locale Language to use to sanitize
   *
   * @returns string input with correct ponctuation
   *
   * @usage
   *  input => La méthode s'utilise de la manière suivante: sanitize
   *  locale => fr
   *  Must return : La méthode s'utilise de la manière suivante : santize
   *  locale => us
   *  Must return : La méthode s'utilise de la manière suivante: sanitize
   *
   * French language
   *  => : | ; One space before, One space after
   *  => ,|. One space after
   * English languages
   *  => : | ; One space after only
   *  => ,|. One space after
   */

  public static removeSpacesWithDashes(value: string): string {
    return StringHelper.removeSpaces(value).replace(' ', '-');
  }

  /**
   * @param value String to remove leading chars
   * @param regex Pattern of unexpected chars
   * @usage StringHelper.removeUnexpectedLeadingChars('my string', /[-_ ]/g)
   */

  public static removeUnexpectedLeadingChars(
    value: string,
    regex: RegExp
  ): string {
    let firstChar: string = value.charAt(0);
    while (firstChar.match(regex)) {
      value = value.substring(1);
      firstChar = value.charAt(0);
    }
    return value;
  }

  public static removeUnexpectedTrailingChars(
    value: string,
    regex: RegExp
  ): string {
    value = value.split('').reverse().join('');
    value = StringHelper.removeUnexpectedLeadingChars(value, regex);
    return value.split('').reverse().join();
  }

  /**
   *
   * @param value String to sanitize
   * @param locale Optional locale to compute, default fr
   * @usage StringHelper.sanitizePuncuation(' ma chaine', 'es')
   *    or StringHelper.sanitizePunctuation('ma chaine')
   */
  public static sanitizePunctuation(value: string, locale?: string): string {
    if (locale === undefined) {
      locale = 'fr';
    }

    if (value.match(/[.,;:\!\?]/g) === null) {
      return value;
    }

    const initialValue: string[] = value.split('');

    let output: string = '';
    let previousChar: string = '';
    let nextChar: string = '';
    let strategy: ISanitizePunctuationStrategy;

    for (let i: number = 0; i < initialValue.length; i++) {
      if (
        initialValue[i] === ';' ||
        initialValue[i] === ':' ||
        initialValue[i] === '?' ||
        initialValue[i] === '!'
      ) {
        strategy =
          locale === 'fr'
            ? new SpaceBeforeAndAfterStrategy()
            : new SpaceAfterOnlyStrategy();
        output = strategy.sanitize(i, initialValue, output);
        previousChar = initialValue[i - 1];
        nextChar = initialValue[i + 1];
        if (previousChar === ' ' && nextChar === ' ') {
          output += initialValue[i];
        } else {
          if (previousChar !== ' ') {
            output = output + ' ' + initialValue[i];
          }
          if (nextChar !== ' ') {
            output = output + ' ';
          }
        }
      } else {
        if (initialValue[i] === ',' || initialValue[i] === '.') {
          strategy = new SpaceAfterOnlyStrategy();
          output = strategy.sanitize(i, initialValue, output);
        } else {
          output = output + initialValue[i];
        }
      }
    }
    return output;
  }

  /**
   * Sanitize compound firstname (i.e Jean Luc => Jean-Luc)
   * @param firstname
   * @returns string firstname correctly spelled
   */
  public static sanitizeFirstName(firstname: string): string {
    return '';
  }

  /**
   * Remove unexpected chars before and after a string
   *  i.e !_ Pierre Blin *- => Pierre Blin
   * @param value String to sanitize
   * @param regexp RegExp containing unexpected chars before and after string
   * @returns
   */
  public static removeUnexpectedChars(value: string, regexp: RegExp): string {
    return '';
  }
}
