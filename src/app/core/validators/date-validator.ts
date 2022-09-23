import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
  public static dateNotLessThan(
    control: AbstractControl
  ): ValidationErrors | null {
    if (control.value.trim() === '') {
      return null;
    }

    const userEnteredDate: moment.Moment = moment(control.value);

    const today: moment.Moment = moment();
    if (userEnteredDate.isSameOrAfter(today)) {
      return { dateNotLessThan: true };
    }
    return null;
  }
}
