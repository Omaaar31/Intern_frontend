import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternAddComponent } from './intern/components/intern-add/intern-add.component';
import { InternDetailComponent } from './intern/components/intern-detail/intern-detail.component';
import { InternTableComponent } from './intern/components/intern-table/intern-table.component';
import { POEAddComponent } from './poe/components/poe-add/poe-add.component';
import { POEDetailComponent } from './poe/components/poe-detail/poe-detail.component';
import { POETableComponent } from './poe/components/poe-table/poe-table.component';
import { UserSigninComponent } from './user/components/user-signin/user-signin.component';
import { HasUserGuard } from './user/guards/has-user.guard';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'signin',
      pathMatch: 'full',
    },
    {
      path: 'interns',
      component: InternTableComponent,
    },
    {
      path: 'intern/:id',
      component: InternDetailComponent,
    },
    {
      path: 'intern/manage/add',
      component: InternAddComponent,
    },
    {
      path: '',
      redirectTo: 'interns',
      pathMatch: 'full',
    },
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
      path: 'signin',
      component: UserSigninComponent,
      canActivate: [HasUserGuard],
    },
    {
      //Fallback route
      path: '**',
      redirectTo: 'poes',
      pathMatch: 'full',
    },
  ];
}
