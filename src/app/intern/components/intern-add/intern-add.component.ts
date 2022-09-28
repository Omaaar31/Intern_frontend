import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { take } from 'rxjs/operators';
import { Logger } from 'src/app/core/helpers/logger.spec';
import { Intern } from 'src/app/core/models/intern';
import { POE } from 'src/app/core/models/poe';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import { InternService } from 'src/app/core/services/intern.service';
import { POEService } from 'src/app/core/services/poe.service';
import { DateValidator } from 'src/app/core/validators/date-validator';
import { EmailExistsValidatorService } from 'src/app/core/validators/email-exists-validator.service';
import { InternFormBuilder } from '../../builder/intern-form-builder';

@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss'],
})
export class InternAddComponent implements OnInit, OnDestroy {
  public internForm!: FormGroup;
  private subscription!: Subscription;
  public poes!: POE[];
  constructor(
    private formBuilder: FormBuilder,
    private internService: InternService,
    private poeService: POEService,
    private router: Router,
    private snackBar: AddSnackService,
    private emailExistsValidator: EmailExistsValidatorService
  ) {}

  ngOnInit(): void {
    const myInternForm: InternFormBuilder = new InternFormBuilder(
      this.formBuilder,
      this.emailExistsValidator,
      this.poeService
    );
    this.internForm = myInternForm.internForm;
    myInternForm.toggleAddPoes().subscribe((poes: POE[]) => {
      this.poes = poes;
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  public onSubmit(): void {
    console.log(`Bout to send : ${JSON.stringify(this.internForm!.value)}`);

    // We'll have to pass brand new intern to the add method of our service
    this.subscription = this.internService
      .add(this.internForm!.value)
      .subscribe((intern: Intern) => {
        Logger.info(`An intern was created : ${JSON.stringify(intern)}`);
        // Load a snack
        this.snackBar.config(`Intern was successfully added`, `Got It`);
        this.snackBar.open();

        // Finally go to the intern table component
        this.router.navigate(['/', 'interns']);
      });
  }
}
