import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherComponent} from './components/teacher/teacher.component';
import {TeachersListComponent} from './components/teachers-list/teachers-list.component';
import {TeacherRoutingModule} from "./teacher-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TeacherComponent,
    TeachersListComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule {
}
