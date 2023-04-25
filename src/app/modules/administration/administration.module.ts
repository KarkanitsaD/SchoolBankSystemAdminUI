import { NgModule } from "@angular/core";
import { AdministrationComponent } from "./components/administration/administration.component";
import { MatTabsModule } from "@angular/material/tabs";
import { AdministrationRoutingModule } from "./administration-routing.module";
import { RouterOutlet } from "@angular/router";

@NgModule({
    declarations: [AdministrationComponent],
    imports: [
        MatTabsModule,
        AdministrationRoutingModule,
        RouterOutlet
    ]
})
export class AdministrationModule {}