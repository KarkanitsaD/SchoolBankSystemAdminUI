import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { RegisterModel } from 'src/app/+shared/models/register.model';
import { StudentModel } from 'src/app/+shared/models/student.model';
import { TeacherComponent } from 'src/app/modules/teacher/components/teacher/teacher.component';
import { AddStudent, UpdateStudent } from "../../state/student-state.actions";
import { passwordValidator } from 'src/app/+shared/helpers/password-validator';
import { LoadClasses } from 'src/app/modules/administration/state/class-state/class-state.actions';
import { ClassModel } from 'src/app/+shared/models/class.model';
import { Observable } from 'rxjs';
import { ClassState } from 'src/app/modules/administration/state/class-state/class.state';
import { FileModel } from "../../../../+shared/models/file.model";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['../../../../+shared/styles/model.scss']
})
export class StudentComponent {
  studentForm: FormGroup;

  classes$: Observable<ClassModel[]>;

  constructor(
    private dialogRef: MatDialogRef<TeacherComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: StudentModel
  ) {}

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl<string>(this.data ? this.data.name : '', Validators.required),
      surname: new FormControl<string>(this.data ? this.data.surname : '', Validators.required),
      phone: new FormControl<string>(this.data ? this.data.phone : '', Validators.required),
      classId: new FormControl<string>(this.data ? this.data.classId : ''),
      imageId: new FormControl<string>(this.data ? this.data.imageId : null),
      imageBase64: new FormControl<string>(''),
      imageExtension: new FormControl<string>('')
    });
    this.classes$ = this.store.select(ClassState.classes);
    this.store.dispatch(new LoadClasses());

    if (!this.data) {
      this.addPasswordControl();
    }
  }

  onImageUpload(file: FileModel): void {
    this.studentForm.controls['imageId'].setValue(null);
    this.studentForm.controls['imageBase64'].setValue(file.base64);
    this.studentForm.controls['imageExtension'].setValue(file.extension);
    this.studentForm.markAsDirty();
    console.log(this.studentForm);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const formValue = this.studentForm.value;
    debugger
    if (this.data) {
      formValue.id = this.data.id;
      this.store.dispatch(new UpdateStudent(new StudentModel(formValue)));
    } else {
      this.store.dispatch(new AddStudent(new RegisterModel(formValue)));
    }
    this.dialogRef.close();
  }

  private addPasswordControl(): void {
    const password = new FormControl<string>('', [
        Validators.required,
        passwordValidator()
      ]
    );
    this.studentForm.addControl('password', password);
  }
}
