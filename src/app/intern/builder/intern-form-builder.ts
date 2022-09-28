import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Intern } from 'src/app/core/models/intern';
import { POE } from 'src/app/core/models/poe';
import { POEService } from 'src/app/core/services/poe.service';
import { DateValidator } from 'src/app/core/validators/date-validator';
import { EmailExistsValidatorService } from 'src/app/core/validators/email-exists-validator.service';

export class InternFormBuilder {
  private form: FormGroup | null = null;
  private addPoes: boolean = false;
  private _poes: POE[] | null = null;
  private intern: Intern = new Intern(); //The intern we want to manage (empty Model first)

  constructor(
    private formBuilder: FormBuilder,
    private emailExistsValidator: EmailExistsValidatorService,
    private poeService: POEService
  ) {
    this.intern.name = 'BOULAHBAL';
    this.intern.firstName = 'Omar';
    this.intern.phoneNumber = '06060606';
    (this.intern.email = 'omar@gmail.com'),
      (this.intern.birthDate = new Date('04/04/1998'));
    this.buildForm();
  }

  public get internForm(): FormGroup {
    return this.form!;
  }

  public toggleAddPoes(): Observable<POE[]> {
    return this.poeService.findAll().pipe(
      take(1),
      map((poes: POE[]) => {
        this.addPoes = true;
        this._poes = poes;
        const poesControl: FormControl = new FormControl(
          '',
          Validators.required
        );
        this.form?.addControl('poes', poesControl);
        return poes;
      })
    );
  }

  public get poes(): POE[] | null {
    return this._poes;
  }

  private buildForm(): void {
    /**
     * Build the intern form with all of controls needed except poes
     */

    this.form = this.formBuilder.group({
      name: [
        '', // Default value for the field control
        [Validators.required, Validators.minLength(2)],
      ],
      firstName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')),
        ],
        EmailExistsValidatorService.emailExists,
      ],
      phoneNumber: [''],
      birthDate: ['', [Validators.required]],
      poes: ['', Validators.required],
    });
  }
}
