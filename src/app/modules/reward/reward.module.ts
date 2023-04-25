import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RewardRoutingModule} from "./reward-routing.module";
import { RewardsListComponent } from './component/rewards-list/rewards-list.component';
import { RewardComponent } from './component/reward/reward.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsModule } from "@ngxs/store";
import { RewardState } from "./state/reward.state";


@NgModule({
  declarations: [
    RewardsListComponent,
    RewardComponent
  ],
  imports: [
    CommonModule,
    RewardRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    NgxsModule.forFeature([RewardState])
  ]
})
export class RewardModule {
}
