import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './components/administration/administration.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: 'students',
        loadChildren: () =>
          import('../student/student.module').then((m) => m.StudentModule),
      },
      {
        path: 'teachers',
        loadChildren: () =>
          import('../teacher/teacher.module').then((m) => m.TeacherModule),
      },
      {
        path: 'rewards',
        loadChildren: () =>
          import('../reward/reward.module').then((m) => m.RewardModule),
      },
      {
        path: 'certificates',
        loadChildren: () =>
          import('../certificate/certificate.module').then(
            (m) => m.CertificateModule
          ),
      },
      { path: '**', redirectTo: 'students' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AdministrationRoutingModule {}
