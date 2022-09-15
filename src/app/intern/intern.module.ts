import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternRoutingModule } from './intern-routing.module';
import { InternDetailComponent } from './components/intern-detail/intern-detail.component';
import { InternTableComponent } from './components/intern-table/intern-table.component';
import { InternAddComponent } from './components/intern-add/intern-add.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InternDetailComponent,
    InternTableComponent,
    InternAddComponent,
  ],
  imports: [CommonModule, InternRoutingModule, SharedModule],
})
export class InternModule {}
