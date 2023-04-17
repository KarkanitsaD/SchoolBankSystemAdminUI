import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CertificateComponent } from "./components/certificate/certificate.component";

const routes: Routes = [
    { path: ':id', component: CertificateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class CertificateRoutingModule {
}