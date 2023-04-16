import { Action, Selector, State, StateContext } from '@ngxs/store';
import { RewardStateModel } from './reward-state.model';
import { inject } from '@angular/core';
import { RewardApiService } from '../../services/reward-api.service';
import { RewardModel } from '../../models/reward.model';
import {
  AddReward,
  DeleteReward,
  LoadRewards,
  UpdateReward,
} from './reward-state.actions';
import { Observable, tap } from 'rxjs';
import { patch, removeItem } from '@ngxs/store/operators';

@State<RewardStateModel>({
  name: 'reward',
  defaults: {
    rewards: [],
    reward: null,
  },
})
export class RewardState {
  private apiService = inject(RewardApiService);

  @Selector()
  static rewards(state: RewardStateModel): RewardModel[] {
    return state.rewards;
  }

  @Action(LoadRewards)
  loadRewards(
    ctx: StateContext<RewardStateModel>,
    action: LoadRewards
  ): Observable<RewardModel[]> {
    return this.apiService.getRewardList(action.filterModel).pipe(
      tap((x) => {
        ctx.patchState({
          rewards: x,
        });
      })
    );
  }

  @Action(AddReward)
  addReward(
    _: StateContext<RewardStateModel>,
    action: AddReward
  ): Observable<RewardModel> {
    return this.apiService.addReward(action.reward);
  }

  @Action(UpdateReward)
  updateReward(
    _: StateContext<RewardStateModel>,
    action: UpdateReward
  ): Observable<RewardModel> {
    return this.apiService.updateReward(action.reward);
  }

  @Action(DeleteReward)
  deleteReward(
    ctx: StateContext<RewardStateModel>,
    action: DeleteReward
  ): Observable<any> {
    return this.apiService.deleteReward(action.id).pipe(
      tap(() => {
        ctx.setState(
          patch<RewardStateModel>({
            rewards: removeItem<RewardModel>((x) => x.id === action.id),
          })
        );
      })
    );
  }
}
