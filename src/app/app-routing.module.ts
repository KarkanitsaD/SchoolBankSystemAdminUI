import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./+shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'administration',
        loadChildren: () => 
          import('./modules/administration/administration.module').then(x => x.AdministrationModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
