import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {StudentComponent} from "./components/student/student.component";
import {StudentsListComponent} from "./components/students-list/students-list.component";

const routes: Routes = [
  {path: '', component: StudentsListComponent},
  {path: ':id', component: StudentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
