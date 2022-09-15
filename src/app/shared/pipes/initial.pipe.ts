import { Pipe, PipeTransform } from '@angular/core';
import { Intern } from 'src/app/core/models/intern';

@Pipe({
  name: 'initial',
})
export class InitialPipe implements PipeTransform {
  transform(value: Intern, ...args: unknown[]): string {
    return (
      this.getInitials(value.firstName!) +
      this.getInitials(value.name!).toUpperCase()
    );
  }

  private getInitials(value: string): string {
    value = value.trim();
    const regex: RegExp = /[-_ ]/g;

    let firstInitial: string = value.charAt(0);
    while (firstInitial.match(regex)) {
      value = value.substring(1);
      firstInitial = value.charAt(0);
    }
    let lastInitial: string = '';

    const matches: string[] | null = value.match(regex);
    if (matches !== null) {
      const sepChar: string = matches[0];
      let matchPosition: number = value.indexOf(sepChar);
      lastInitial = value.charAt(matchPosition + 1);
      while (lastInitial.match(regex)) {
        matchPosition++;
        lastInitial = value.charAt(matchPosition);
      }
    }
    return firstInitial + lastInitial;
  }
}
