import { NgModule } from "@angular/core";
import { AdministrationComponent } from "./components/administration/administration.component";
import { MatTabsModule } from "@angular/material/tabs";
import { AdministrationRoutingModule } from "./administration-routing.module";
import { RouterOutlet } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { ClassState } from "./state/class-state/class.state";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [AdministrationComponent],
    imports: [
        CommonModule,
        MatTabsModule,
        AdministrationRoutingModule,
        RouterOutlet,
        NgxsModule.forFeature([ClassState])
    ]
})
export class AdministrationModule {}