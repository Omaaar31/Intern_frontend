import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { POEAddComponent } from './poe/components/poe-add/poe-add.component';
import { POEDetailComponent } from './poe/components/poe-detail/poe-detail.component';
import { POETableComponent } from './poe/components/poe-table/poe-table.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'poes',
      pathMatch: 'full',
    },
    {
      path: 'poes',
      component: POETableComponent,
    },
    {
      path: 'poe/:id',
      component: POEDetailComponent,
    },
    {
      path: 'poe/manage/add',
      component: POEAddComponent,
    },
    {
      path: '**',
      redirectTo: 'poes',
      pathMatch: 'full',
    },
  ];
}
