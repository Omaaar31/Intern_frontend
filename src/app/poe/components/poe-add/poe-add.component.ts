import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { POE } from 'src/app/core/models/poe';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import { POEService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'app-poe-add',
  templateUrl: './poe-add.component.html',
  styleUrls: ['./poe-add.component.scss'],
})
export class POEAddComponent implements OnInit {
  public poeForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private poeService: POEService,
    private router: Router,
    private snackBar: AddSnackService
  ) {}

  ngOnInit(): void {
    this.poeForm = this.formBuilder.group({
      name: [
        '', //Le boutton submit se grise si aucun champ n'a été rempli
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
    });
  }

  public onSubmit(): void {
    console.log(`About to send : ${JSON.stringify(this.poeForm.value)}`);
    const nextId: number = this.poeService.getNextId();

    //We'll have to create a new Intern Instance
    const poe: POE = new POE();
    poe.id = nextId;
    poe.name = this.poeForm.value.name;

    //We'll have to pass brand new intern to the add method of our service
    this.poeService.add(poe);

    this.snackBar.config(
      `Intern was successfully added`,
      `Got
    It`
    );
    this.snackBar.open();

    //Finally go to the intern table component
    this.router.navigate(['/', 'poes']);
  }
}
