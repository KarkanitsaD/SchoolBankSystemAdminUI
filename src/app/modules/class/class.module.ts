import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CLassRoutingModule } from "./class-routing.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { ClassListComponent } from "./components/class-list/class-list.component";
import { ClassComponent } from "./components/class/class.component";

@NgModule({
    declarations:[
        ClassListComponent,
        ClassComponent
    ],
    imports: [
        CommonModule,
        CLassRoutingModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule
    ]
})
export class CLassModule {
}