import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { InternService } from './../services/intern.service';
import { catchError, take } from 'rxjs';
import { Logger } from '../helpers/logger.spec';

@Injectable({
  providedIn: 'root',
})
export class EmailExistsValidatorService {
  private static myValidator: EmailExistsValidatorService;

  constructor(private internService: InternService) {
    EmailExistsValidatorService.myValidator = this; // Store the object instance in a static attribute of this class
  }

  public static emailExists(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return EmailExistsValidatorService.myValidator.alreadyExists(control);
  }

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
