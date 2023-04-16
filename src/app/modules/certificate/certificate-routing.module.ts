import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CertificatesListComponent } from "./components/certificates-list/certificates-list.component";
import { CertificateComponent } from "./components/certificate/certificate.component";

const routes: Routes = [
    { path: '', component: CertificatesListComponent },
    { path: ':id', component: CertificateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class CertificateRoutingModule {
}