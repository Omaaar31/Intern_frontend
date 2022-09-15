import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss'],
})
export class UserSigninComponent implements OnInit {
  public signinForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      login: [
        '', //Default value of login
        Validators.required,
      ],
      pass: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.userService.signin(this.signinForm.value);
  }
}
