import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TeachersListComponent} from "./components/teachers-list/teachers-list.component";
import {TeacherComponent} from "./components/teacher/teacher.component";

const routes: Routes = [
  {path: '', component: TeachersListComponent},
  {path: 'teacher', component: TeacherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
