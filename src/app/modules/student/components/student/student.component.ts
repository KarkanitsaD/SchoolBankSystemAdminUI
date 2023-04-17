import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { RegisterModel } from 'src/app/+shared/models/register.model';
import { StudentModel } from 'src/app/+shared/models/student.model';
import { AddStudent, UpdateStudent } from 'src/app/+shared/state/student-state/student-state.actions';
import { TeacherComponent } from 'src/app/modules/teacher/components/teacher/teacher.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  studentForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TeacherComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: StudentModel
  ) {}

  ngOnInit(): void {
    this.studentForm = new FormGroup({
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
    const formValue = this.studentForm.value;
    if (this.data) {
      formValue.id = this.data.id;
      this.store.dispatch(new UpdateStudent(new StudentModel(formValue)));
    } else {
      this.store.dispatch(new AddStudent(new RegisterModel(formValue)));
    }
    this.dialogRef.close();
  }

  private addPasswordControl(): void {
    const password = new FormControl<string>('', Validators.required);
    this.studentForm.addControl('password', password);
  }
}
