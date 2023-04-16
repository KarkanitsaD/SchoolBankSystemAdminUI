import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeacherModel } from 'src/app/+shared/models/teacher.model';
import { AuthApiService } from 'src/app/+shared/services/auth-api.service';
import { TeacherApiService } from 'src/app/+shared/services/teacher-api.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  teacherForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TeacherComponent>,
    private authApiService: AuthApiService,
    private teacherApiService: TeacherApiService,
    @Inject(MAT_DIALOG_DATA) public data: TeacherModel
  ) {}

  ngOnInit(): void {
    this.teacherForm = new FormGroup({
      name: new FormControl<string>(this.data ? this.data.name : '', Validators.required),
      surname: new FormControl<string>(this.data ? this.data.surname : '', Validators.required),
      phone: new FormControl<string>(this.data ? this.data.phone : '', Validators.required)
    });

    if (!this.data) {
      this.addPasswordControls();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    const formValue = this.teacherForm.value;
    if (this.data) {
      
    } else {

    }
  }

  private addPasswordControls(): void {
    const password = new FormControl<string>('', Validators.required);
    const confirmPassword = new FormControl<string>('', Validators.required);
    this.teacherForm.addControl('password', password);
    this.teacherForm.addControl('confirmPassword', confirmPassword);
  }
}
