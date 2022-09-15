import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Intern } from 'src/app/core/models/intern';
import { InternService } from 'src/app/core/services/intern.service';

@Component({
  selector: 'app-intern-add',
  templateUrl: './intern-add.component.html',
  styleUrls: ['./intern-add.component.scss'],
})
export class InternAddComponent implements OnInit {
  public internForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private internService: InternService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.internForm = this.formBuilder.group({
      name: [
        '', //Le boutton submit se grise si aucun champ n'a été rempli
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
    });
  }
  public onSubmit(): void {
    console.log(`About to send : ${JSON.stringify(this.internForm.value)}`);
    const nextId: number = this.internService.getNextId();

    //We'll have to create a new Intern Instance
    const intern: Intern = new Intern();
    intern.id = nextId;
    intern.name = this.internForm.value.name;

    //We'll have to pass brand new intern to the add method of our service
    this.internService.add(intern);

    //Finally go to the intern table component
    this.router.navigate(['/', 'interns']);
  }
}
