import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { RegisterModel } from 'src/app/+shared/models/register.model';
import { TeacherModel } from 'src/app/+shared/models/teacher.model';
import { AddTeacher, UpdateTeacher } from "../../state/teacher-state.actions";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  teacherForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TeacherComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: TeacherModel
  ) {}

  ngOnInit(): void {
    this.teacherForm = new FormGroup({
      name: new FormControl<string>(this.data ? this.data.name : '', Validators.required),
      surname: new FormControl<string>(this.data ? this.data.surname : '', Validators.required),
      phone: new FormControl<string>(this.data ? this.data.phone : '', Validators.required)
    });

    if (!this.data) {
      this.addPasswordControl();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const formValue = this.teacherForm.value;
    if (this.data) {
      formValue.id = this.data.id;
      this.store.dispatch(new UpdateTeacher(new TeacherModel(formValue)));
    } else {
      this.store.dispatch(new AddTeacher(new RegisterModel(formValue)));
    }
    this.dialogRef.close();
  }

  private addPasswordControl(): void {
    const password = new FormControl<string>('', Validators.required);
    this.teacherForm.addControl('password', password);
  }
}
