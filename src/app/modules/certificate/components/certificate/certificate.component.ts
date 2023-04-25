import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { CertificateModel } from "src/app/+shared/models/certificate.model";
import { AddCertificate, UpdateCertificate } from "../../state/certificate-state.actions";

@Component({
    selector: 'app-certificate',
    templateUrl: './certificate.component.html',
    styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
    certificateForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<CertificateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CertificateModel,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.certificateForm = new FormGroup({
            title: new FormControl<string>(this.data ? this.data.title : '', Validators.required),
            description: new FormControl<string>(this.data ? this.data.description : '', Validators.required),
            price: new FormControl<number>(this.data ? this.data.price : null, Validators.required)
        });
    }

    onApply(): void {
        const formValue = this.certificateForm.value;
        const model = new CertificateModel(formValue);
        if (this.data) {
            model.id = this.data.id;
            this.store.dispatch(new UpdateCertificate(model));
        } else {
            this.store.dispatch(new AddCertificate(model));
        }
        this.dialogRef.close();
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}