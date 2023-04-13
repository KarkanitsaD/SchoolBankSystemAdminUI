import {Action, Selector, State, StateContext} from "@ngxs/store";
import {RewardStateModel} from "./reward-state.model";
import {inject} from "@angular/core";
import {RewardApiService} from "../../services/reward-api.service";
import {RewardModel} from "../../models/reward.model";
import {LoadRewards} from "./reward-state.actions";
import {Observable, tap} from "rxjs";

@State<RewardStateModel>({
  name: 'reward',
  defaults: {
    rewards: [],
    reward: null
  }
})
export class RewardState {
  private apiService = inject(RewardApiService);

  @Selector()
  static rewards(state: RewardStateModel): RewardModel[] {
    return state.rewards;
  }

  @Action(LoadRewards)
  loadRewards(ctx: StateContext<RewardStateModel>, action: LoadRewards): Observable<RewardModel[]> {
    return this.apiService.getRewardList(action.filterModel)
      .pipe(tap(x => {
        ctx.patchState({
          rewards: x
        })
      }));
  }
}
