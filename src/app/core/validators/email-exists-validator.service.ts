import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { take } from 'rxjs';
import { Logger } from '../helpers/logger.spec';
import { InternService } from '../services/intern.service';

@Injectable({
  providedIn: 'root',
})
export class EmailExistsValidatorService {
  static emailExists: AsyncValidatorFn | AsyncValidatorFn[] | null | undefined;
  constructor(private internService: InternService) {}

  public alreadyExists(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    const validationError: ValidationErrors = { alreadyExists: true };
    return new Promise((emailExists) => {
      this.internService
        .emailAlreadyExists(control.value)
        .pipe(take(1))
        .subscribe({
          next: (response: HttpResponse<any>) => {
            Logger.info(`Got a ${response.status} so, all is okay`);
            emailExists(null);
          },
          error: (error: any) => {
            Logger.error(`email ${control.value} is already taken`);
            emailExists(validationError);
          },
        });
    });
  }
}
