import { Component, Inject } from "@angular/core";
import { FormControl, FormControlDirective, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { ClassModel } from "src/app/+shared/models/class.model";
import { AddClass, UpdateClass } from "src/app/modules/administration/state/class-state/class-state.actions";

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['../../../../+shared/styles/model.scss']
})
export class ClassComponent {
    nameControl: FormControl<string>;

    constructor(
        private dialogRef: MatDialogRef<ClassComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ClassModel,
        private store: Store
    ) {
        this.nameControl = new FormControl<string>(this.data ? this.data.name : '', Validators.required);
    }

    onApply(): void {
        const model = new ClassModel({name: this.nameControl.value});
        if (this.data) {
            model.id = this.data.id;
            this.store.dispatch(new UpdateClass(model));
        } else {
            this.store.dispatch(new AddClass(model));
        }
        this.dialogRef.close();
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}