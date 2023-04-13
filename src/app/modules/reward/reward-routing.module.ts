import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RewardsListComponent} from "./component/rewards-list/rewards-list.component";
import {RewardComponent} from "./component/reward/reward.component";

const routes: Routes = [
  {path: '', component: RewardsListComponent},
  {path: ':id', component: RewardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class RewardRoutingModule {
}
