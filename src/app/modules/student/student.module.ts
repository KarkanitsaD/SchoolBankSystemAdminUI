import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentsListComponent} from './components/students-list/students-list.component';
import {StudentComponent} from './components/student/student.component';
import {StudentRoutingModule} from "./student-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgxsModule } from "@ngxs/store";
import { StudentState } from "./state/student.state";
import { StudentInfoComponent } from "./components/student-info/student-info.component";
import { MatLegacyTabsModule } from "@angular/material/legacy-tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentComponent,
    StudentInfoComponent
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
        ReactiveFormsModule,
        MatIconModule,
        MatCardModule,
        NgxsModule.forFeature([StudentState]),
        MatLegacyTabsModule,
        MatProgressSpinnerModule
    ]
})
export class StudentModule {
}
