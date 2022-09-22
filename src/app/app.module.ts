import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { InternModule } from './intern/intern.module';
import { POEModule } from './poe/poe.module';
import { UserModule } from './user/user.module';
import { appInit } from './core/services/app-init.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    InternModule,
    POEModule,
    UserModule,
  ],
  providers: [appInit],
  bootstrap: [AppComponent],
})
export class AppModule {}
