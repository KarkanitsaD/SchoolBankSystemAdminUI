import {Component, OnInit} from '@angular/core';
import {ObserverComponent} from "../../../../+shared/components/observer/observer.component";
import {Store} from "@ngxs/store";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {RewardModel} from "../../../../+shared/models/reward.model";
import {RewardState} from "../../../../+shared/state/reward-state/reward.state";
import {RewardFilterModel} from "../../../../+shared/models/reward-filter.model";
import {LoadRewards} from "../../../../+shared/state/reward-state/reward-state.actions";

@Component({
  selector: 'app-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent extends ObserverComponent implements OnInit {
  rewardColumns: string[] = ['description', 'sum'];
  dataSource: MatTableDataSource<RewardModel>;

  filterForm: FormGroup = new FormGroup({
    description: new FormControl<string>(''),
    minSum: new FormControl<number>(null),
    maxSum: new FormControl<number>(null)
  });

  constructor(private store: Store) {
    super();
  }

  ngOnInit(): void {
    debugger
    this.subscriptions.push(this.filterChangesSubscription(), this.listSubscription());
    this.store.dispatch(new LoadRewards(this.filterForm.value));
  }

  private filterChangesSubscription(): Subscription {
    return this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) =>
            JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe(x => {
        const filterModel = new RewardFilterModel(x);
        this.store.dispatch(new LoadRewards(filterModel));
      });
  }

  private listSubscription(): Subscription {
    return this.store.select(RewardState.rewards).subscribe(x => {
      this.dataSource = new MatTableDataSource<RewardModel>(x);
    });
  }
}
