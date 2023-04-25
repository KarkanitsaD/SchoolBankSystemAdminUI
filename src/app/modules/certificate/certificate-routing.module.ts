import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CertificatesListComponent } from "./components/certificates-list/certificates-list.component";

const routes: Routes = [
    { path: '', component: CertificatesListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class CertificateRoutingModule {
}