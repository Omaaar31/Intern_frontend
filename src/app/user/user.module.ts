import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserSigninComponent } from './components/user-signin/user-signin.component';

@NgModule({
  declarations: [UserSigninComponent],
  imports: [CommonModule, SharedModule],
})
export class UserModule {}
