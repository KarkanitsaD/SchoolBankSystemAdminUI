import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentsListComponent} from './components/students-list/students-list.component';
import {StudentComponent} from './components/student/student.component';
import {StudentRoutingModule} from "./student-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentComponent
  ],
  exports: [
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class StudentModule {
}
