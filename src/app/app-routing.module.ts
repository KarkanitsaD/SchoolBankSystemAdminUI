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
        path: 'students',
        loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'teachers',
        loadChildren: () => import('./modules/teacher/teacher.module').then(m => m.TeacherModule)
      },
      {
        path: 'rewards',
        loadChildren: () => import('./modules/reward/reward.module').then(m => m.RewardModule)
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
