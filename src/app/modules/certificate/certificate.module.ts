import { NgModule } from "@angular/core";
import { CertificatesListComponent } from "./components/certificates-list/certificates-list.component";
import { CertificateComponent } from "./components/certificate/certificate.component";
import { CommonModule } from "@angular/common";
import { CertificateRoutingModule } from "./certificate-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxsModule } from "@ngxs/store";
import { CertificateState } from "./state/certificate.state";

@NgModule({
    declarations: [
        CertificatesListComponent,
        CertificateComponent
    ],
    imports: [
        CommonModule,
        CertificateRoutingModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        NgxsModule.forFeature([CertificateState])
    ]
})
export class CertificateModule {
}