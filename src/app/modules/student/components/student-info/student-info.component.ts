import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StudentModel } from "../../../../+shared/models/student.model";
import { StudentApiService } from "../../../../+shared/services/student-api.service";

@Component({
    selector: 'app-student-info',
    templateUrl: './student-info.component.html',
    styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {
    loading = true;

    student: StudentModel;

    constructor(
        private dialogRef: MatDialogRef<StudentInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private apiService: StudentApiService
    ) {}

    ngOnInit() {
        this.apiService.getStudent(this.data).subscribe(data => {
            this.student = data;
            this.loading = false;
        });
    }

    onClose(): void {
        this.dialogRef.close();
    }
}