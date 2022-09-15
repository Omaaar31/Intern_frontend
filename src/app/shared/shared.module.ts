import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UiModule } from '../ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgePipe } from './pipes/age.pipe';
import { InitialsDirective } from './directives/initials.directive';
import { InitialPipe } from './pipes/initial.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AgePipe,
    InitialsDirective,
    InitialPipe,
  ],
  imports: [CommonModule, UiModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    UiModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    AgePipe,
    InitialsDirective,
    InitialPipe,
  ],
})
export class SharedModule {}
