import { NgModule } from "@angular/core";
import { AdministrationComponent } from "./components/administration/administration.component";
import { MatTabsModule } from "@angular/material/tabs";
import { AdministrationRoutingModule } from "./administration-routing.module";

@NgModule({
    declarations: [AdministrationComponent],
    imports: [
        MatTabsModule,
        AdministrationRoutingModule
    ]
})
export class AdministrationModule {}